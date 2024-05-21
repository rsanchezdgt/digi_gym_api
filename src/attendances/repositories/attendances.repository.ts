import { FirebaseConfig } from '../../firebase-config';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { Attendance } from '../entities/attendance.entity';

export class AttendancesRepository {
  private getAttendancesCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.attendanceCollection(`tenants/${tenantId}`);
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

  public async create(
    tenantId: string,
    createAttendanceDto: CreateAttendanceDto,
  ) {
    return await this.getAttendancesCollection(tenantId).add(
      createAttendanceDto,
    );
  }
}
