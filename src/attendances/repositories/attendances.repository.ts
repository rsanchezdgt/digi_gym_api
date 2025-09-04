import { FirebaseConfig } from '../../firebase-config';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import {
  Attendance,
  AttendanceWithCustomer,
} from '../entities/attendance.entity';

export class AttendancesRepository {
  private getAttendancesCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.attendanceCollection(`tenants/${tenantId}`);
  }
  private getCustomersCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.customerCollection(`tenants/${tenantId}`);
  }

  public async getByCustomer(
    tenantId: string,
    customerId: string,
  ): Promise<Attendance[]> {
    const snapshot = await this.getAttendancesCollection(tenantId)
      .where('customerId', '==', customerId)
      .get();

    const attendanceCollections = snapshot.docs.map((attendanceDoc) => {
      const attendance = new Attendance();
      attendance.id = attendanceDoc.id;
      Object.assign(attendance, attendanceDoc.data());
      return attendance;
    });

    return attendanceCollections;
  }

  public async getByMembership(
    tenantId: string,
    membershipId: string,
  ): Promise<AttendanceWithCustomer[]> {
    // get all customers by membershipId
    const snapshot = await this.getCustomersCollection(tenantId)
      .where('membershipId', '==', membershipId)
      .get();

    // if no customers found with this membership, return empty array
    if (snapshot.docs.length === 0) {
      return [];
    }

    // get all attendances by customerIds
    const attendanceSnapshot = await this.getAttendancesCollection(tenantId)
      .where(
        'customerId',
        'in',
        snapshot.docs.map((customerDoc) => customerDoc.id),
      )
      .get();

    const attendanceCollections = attendanceSnapshot.docs.map(
      (attendanceDoc) => {
        const attendanceWithCustomer = new AttendanceWithCustomer();
        attendanceWithCustomer.id = attendanceDoc.id;
        Object.assign(attendanceWithCustomer, attendanceDoc.data());
        const customer = snapshot.docs.find(
          (customerDoc) => customerDoc.id === attendanceDoc.data().customerId,
        );
        attendanceWithCustomer.customerName =
          customer.data().name + ' ' + customer.data().lastName;
        return attendanceWithCustomer;
      },
    );

    return attendanceCollections;
  }

  public async create(
    tenantId: string,
    createAttendanceDto: CreateAttendanceDto,
  ) {
    return await this.getAttendancesCollection(tenantId).add(
      createAttendanceDto,
    );
  }
}
