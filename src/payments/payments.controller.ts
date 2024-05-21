import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Req() req, @Body() createPaymentDto: CreatePaymentDto) {
    const tenantId = req.query['tenantId'];
    return this.paymentsService.create(tenantId, createPaymentDto);
  }

  @Get('get-by-customer/:id')
  getByCustomer(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.paymentsService.getByCustomer(tenantId, id);
  }
}
