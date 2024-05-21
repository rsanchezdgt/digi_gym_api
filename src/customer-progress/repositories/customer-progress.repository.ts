import { FirebaseConfig } from '../../firebase-config';
import { CreateCustomerProgressDto } from '../dto/create-customer-progress.dto';
import { CustomerProgress } from '../entities/customer-progress.entity';

export class CustomerProgressRepository {
  private getCustomerProgressCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.customerProgressCollection(`tenants/${tenantId}`);
  }

  public async getByCustomer(
    tenantId: string,
    customerId: string,
  ): Promise<CustomerProgress[]> {
    const snapshot = await this.getCustomerProgressCollection(tenantId)
      .where('customerId', '==', customerId)
      .get();

    const customerProgressCollections = snapshot.docs.map(
      (customerProgressDoc) => {
        const customerProgress = new CustomerProgress();
        customerProgress.id = customerProgressDoc.id;
        Object.assign(customerProgress, customerProgressDoc.data());
        return customerProgress;
      },
    );

    return customerProgressCollections;
  }

  public async create(
    tenantId: string,
    createCustomerProgressDto: CreateCustomerProgressDto,
  ) {
    return await this.getCustomerProgressCollection(tenantId).add(
      createCustomerProgressDto,
    );
  }
}
