import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportsRepository } from './repositories/reports.repository';
import { MembershipsRepository } from 'src/memberships/repositories/memberships.repository';
import { MembershipTypesRepository } from 'src/membership-types/repositories/membership-types.repository';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, MembershipTypesRepository, MembershipsRepository],
})
export class ReportsModule {}
