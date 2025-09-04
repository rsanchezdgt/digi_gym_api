export class Attendance {
  public id: string;
  public customerId: string;
  public attendanceDate: string;
  public attendanceHour: string;
}

export class AttendanceWithCustomer {
  public id: string;
  public customerId: string;
  public customerName: string;
  public attendanceDate: string;
  public attendanceHour: string;
}
