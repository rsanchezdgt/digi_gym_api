import { FirebaseConfig } from '../../firebase-config';
import { CreateGuestCustomerDto } from '../dto/create-guest-customer.dto';
import { GuestCustomer } from '../entities/guest-customer.entity';

export class GuestCustomersRepository {
  getGuestCustomersCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.guestCustomerCollection(`tenants/${tenantId}`);
  }

  public async getAll(tenantId: string): Promise<GuestCustomer[]> {
    const snapshot = await this.getGuestCustomersCollection(tenantId).get();

    const guestCustomerCollections = snapshot.docs.map((guestCustomerDoc) => {
      const guestCustomer = new GuestCustomer();
      guestCustomer.id = guestCustomerDoc.id;
      Object.assign(guestCustomer, guestCustomerDoc.data());
      return guestCustomer;
    });

    return guestCustomerCollections;
  }
  
  public async getPaginated(tenantId: string, after?: string) {
    const totalCount = await this.getGuestCustomersCollection(tenantId).count().get();

    let query = this.getGuestCustomersCollection(tenantId).orderBy('email', 'desc');

    if (after) {
      query = query.startAfter(after);
    }
    const snapshot = await query.limit(10).get();

    const guestCustomerCollections = snapshot.docs.map((guestCustomerDoc) => {
      const guestCustomer = new GuestCustomer();
      guestCustomer.id = guestCustomerDoc.id;
      Object.assign(guestCustomer, guestCustomerDoc.data());
      return guestCustomer;
    });

    return {
      totalCount: totalCount.data().count,
      guestCustomers: guestCustomerCollections,
    }
  }

  public async create(
    tenantId: string,
    guestCustomer: CreateGuestCustomerDto,
  ): Promise<void> {
    await this.getGuestCustomersCollection(tenantId).add(guestCustomer);
  }

  public async deleteOne(tenantId: string, id: string): Promise<void> {
    await this.getGuestCustomersCollection(tenantId).doc(id).delete();
  }
}
