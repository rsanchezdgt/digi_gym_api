import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { CustomerProgressService } from './customer-progress.service';
import { CreateCustomerProgressDto } from './dto/create-customer-progress.dto';

@Controller('customer-progress')
export class CustomerProgressController {
  constructor(
    private readonly customerProgressService: CustomerProgressService,
  ) {}

  @Post()
  create(
    @Req() req,
    @Body() createCustomerProgressDto: CreateCustomerProgressDto,
  ) {
    const tenantId = req.query['tenantId'];
    return this.customerProgressService.create(
      tenantId,
      createCustomerProgressDto,
    );
  }

  @Get('get-by-customer/:id')
  getByCustomer(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.customerProgressService.getByCustomer(tenantId, id);
  }
}
