import { Controller, Get, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/payments')
  filterPayments(@Req() req) {
    const tenantId = req.query['tenantId'];
    const startDate = req.query['startDate'];
    const endDate = req.query['endDate'];
    const membershipId = req.query['membershipId'];
    const isReferred = req.query['isReferred'] === 'true';
    const customerSex = req.query['gender'];

    return this.reportsService.filterPayments(
      tenantId,
      startDate,
      endDate,
      isReferred,
      customerSex,
      membershipId,
    );
  }
  
  @Get('/customers')
  filterCustomers(@Req() req) {
    const tenantId = req.query['tenantId'];
    const membershipId = req.query['membershipId'];

    return this.reportsService.filterCustomers(
      tenantId,
      membershipId,
    );
  }
}
