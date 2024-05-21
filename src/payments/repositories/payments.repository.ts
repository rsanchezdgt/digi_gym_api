import { FirebaseConfig } from '../../firebase-config';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../entities/payment.entity';

export class PaymentsRepository {
  getPaymentsCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.paymentCollection(`tenants/${tenantId}`);
  }

  public async getByCustomer(
    tenantId: string,
    customerId: string,
  ): Promise<Payment[]> {
    const snapshot = await this.getPaymentsCollection(tenantId)
      .where('customerId', '==', customerId)
      .get();

    const paymentCollections = snapshot.docs.map((paymentDoc) => {
      const payment = new Payment();
      payment.id = paymentDoc.id;
      Object.assign(payment, paymentDoc.data());
      return payment;
    });

    return paymentCollections;
  }

  public async create(tenantId: string, createPaymentDto: CreatePaymentDto) {
    return await this.getPaymentsCollection(tenantId).add(
      JSON.parse(JSON.stringify(createPaymentDto)),
    );
  }
}
