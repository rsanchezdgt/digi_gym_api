import { Customer } from 'src/customers/entities/customer.entity';
import { FirebaseConfig } from '../../firebase-config';
import { ReportPayment } from '../entities/report_payment.entity';
import { Membership } from 'src/memberships/entities/membership.entity';

export class ReportsRepository {
  _getPaymentsCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.paymentCollection(`tenants/${tenantId}`);
  }
  _getCustomersCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.customerCollection(`tenants/${tenantId}`);
  }

  public async filterPayments(
    tenantId: string,
    startDate: string,
    endDate: string,
    isReferred: boolean,
    customerSex: number,
    membershipList: Membership[],
    membershipId?: string,
  ): Promise<ReportPayment[]> {
    let query = this._getPaymentsCollection(tenantId)
      .where('isReferred', '==', isReferred)
      .where('paymentDate', '>=', startDate)
      .where('paymentDate', '<=', endDate);

    if (customerSex == 1) {
      query = query.where('customerSex', '==', true);
    } else if (customerSex == 2) {
      query = query.where('customerSex', '==', false);
    }

    if (membershipId) {
      query = query.where('membershipId', '==', membershipId);
    }

    const snapshot = await query.get();

    return Promise.all(
      snapshot.docs.map(async (paymentDoc) => {
        const payment = new ReportPayment();
        payment.id = paymentDoc.id;
        Object.assign(payment, paymentDoc.data());
        payment.membershipName = membershipList.find(
          (m) => m.id == payment.membershipId,
        ).name;
        return payment;
      }),
    );
  }
  
  public async filterCustomers(
    tenantId: string,
    membershipId?: string
  ): Promise<Customer[]> {
    let query = this._getCustomersCollection(tenantId)
      .where('membershipId', '==', membershipId);

    const snapshot = await query.get();

    return Promise.all(
      snapshot.docs.map(async (customerDoc) => {
        const customer = new Customer();
        customer.id = customerDoc.id;
        Object.assign(customer, customerDoc.data());
        return customer;
      }),
    );
  }
}
