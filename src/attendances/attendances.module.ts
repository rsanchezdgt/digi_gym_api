import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';
import { AttendancesRepository } from './repositories/attendances.repository';

@Module({
  controllers: [AttendancesController],
  providers: [AttendancesService, AttendancesRepository],
})
export class AttendancesModule {}
