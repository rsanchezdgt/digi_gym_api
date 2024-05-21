import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendancesRepository } from './repositories/attendances.repository';

@Injectable()
export class AttendancesService {
  constructor(private attendancesRepository: AttendancesRepository) {}

  create(tenantId: string, createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesRepository.create(tenantId, createAttendanceDto);
  }

  getByCustomer(tenantId: string, customerId: string) {
    return this.attendancesRepository.getByCustomer(tenantId, customerId);
  }
}
