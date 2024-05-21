import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './repositories/reports.repository';
import { MembershipsRepository } from 'src/memberships/repositories/memberships.repository';
import { MembershipTypesRepository } from 'src/membership-types/repositories/membership-types.repository';

@Injectable()
export class ReportsService {
  constructor(
    private reportsRepository: ReportsRepository,
    private membershipTypesRepository: MembershipTypesRepository,
    private membershipsRepository: MembershipsRepository,
  ) {}

  async filterPayments(
    tenantId: string,
    startDate: string,
    endDate: string,
    isReferred: boolean,
    customerSex: number,
    membershipId?: string,
  ) {
    const types = await this.membershipTypesRepository.getAll(tenantId);
    const membershipList = await this.membershipsRepository.getAll(tenantId, types);
    return this.reportsRepository.filterPayments(
      tenantId,
      startDate,
      endDate,
      isReferred,
      customerSex,
      membershipList,
      membershipId,
    );
  }
  
  filterCustomers(
    tenantId: string,
    membershipId?: string,
  ) {
    return this.reportsRepository.filterCustomers(
      tenantId,
      membershipId,
    );
  }
}
