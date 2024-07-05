import { FirebaseConfig } from '../../firebase-config';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { RenewMembershipDto } from '../dto/renew-membership.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

export class CustomersRepository {
  getCustomersCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.customerCollection(`tenants/${tenantId}`);
  }

  public async getAll(tenantId: string): Promise<Customer[]> {
    const snapshot = await this.getCustomersCollection(tenantId).get();

    const customerCollections = snapshot.docs.map((customerDoc) => {
      const customer = new Customer();
      customer.id = customerDoc.id;
      Object.assign(customer, customerDoc.data());
      return customer;
    });

    return customerCollections;
  }
  
  public async getPaginated(tenantId: string, after?: string) {
    const totalCount = await this.getCustomersCollection(tenantId).count().get();

    let query = this.getCustomersCollection(tenantId).orderBy('userId', 'desc');

    if (after) {
      query = query.startAfter(after);
    }
    const snapshot = await query.limit(10).get();

    const customerCollections = snapshot.docs.map((customerDoc) => {
      const customer = new Customer();
      customer.id = customerDoc.id;
      Object.assign(customer, customerDoc.data());
      return customer;
    });

    return {
      totalCount: totalCount.data().count,
      customers: customerCollections,
    };
  }

  public async getById(tenantId: string, id: string): Promise<Customer | undefined> {
    const doc = await this.getCustomersCollection(tenantId).doc(id).get();

    if (doc.exists) {
      const customer = new Customer();
      customer.id = doc.id;
      Object.assign(customer, doc.data());
      return customer;
    }
    return undefined;
  }

  public async getMembershipEndDate(
    tenantId: string,
    id: string,
  ): Promise<string> {
    const doc = await this.getCustomersCollection(tenantId).doc(id).get();

    const customer = new Customer();
    Object.assign(customer, doc.data());

    return customer.membershipEndDate;
  }

  public async create(
    tenantId: string,
    customer: CreateCustomerDto,
  ): Promise<string> {
    delete customer.membershipCurrency;
    delete customer.paidAmount;
    delete customer.paymentMethod;
    const response = await this.getCustomersCollection(tenantId).add(customer);
    return response.id;
  }

  public async uploadPicture(
    tenantId: string,
    uid: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const buffer = file.buffer;
    const bf = Buffer.from(buffer);
    const bucket = FirebaseConfig.storage().bucket();
    const fileName = `tenants/${tenantId}/users/${uid}/${file.originalname.trim()}`;

    const uploadFile = bucket.file(fileName);
    await uploadFile.save(bf, {
      metadata: {
        contentType: file.mimetype,
        cacheControl: 'public, max-age=31536000',
      },
    });

    const hundredYears = new Date();
    hundredYears.setFullYear(hundredYears.getFullYear() + 100);
    const formatted = `${hundredYears.getMonth()}${hundredYears.getDay()}${hundredYears.getFullYear()}`;
    const downloadResponse = await uploadFile.getSignedUrl({
      action: 'read',
      expires: formatted,
    });
    return downloadResponse[0];
  }

  public async update(
    tenantId: string,
    id: string,
    customer: UpdateCustomerDto,
  ) {
    const customerDoc = this.getCustomersCollection(tenantId).doc(id);
    await customerDoc.update({
      name: customer.name,
      lastName: customer.lastName,
      idCard: customer.idCard,
      dateOfBirth: customer.dateOfBirth,
      nationality: customer.nationality,
      nationalityOther: customer.nationalityOther,
      phone: customer.phone,
      email: customer.email,
      metBy: customer.metBy,
      metByOther: customer.metByOther,
      referredBy: customer.referredBy,
      sex: customer.sex,
    });
  }
  
  public async updateMembership(
    tenantId: string,
    renewMembershipDto: RenewMembershipDto,
  ) {
    const customerDoc = this.getCustomersCollection(tenantId).doc(renewMembershipDto.customerId);
    await customerDoc.update({
      membershipId: renewMembershipDto.membershipId,
      membershipStartDate: renewMembershipDto.membershipStartDate,
      membershipEndDate: renewMembershipDto.membershipEndDate,
    });
  }
}
