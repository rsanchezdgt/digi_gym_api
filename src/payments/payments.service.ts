import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsRepository } from './repositories/payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private paymentsRepository: PaymentsRepository) {}

  create(tenantId: string, createPaymentDto: CreatePaymentDto) {
    return this.paymentsRepository.create(tenantId, createPaymentDto);
  }

  getByCustomer(tenantId: string, customerId: string) {
    return this.paymentsRepository.getByCustomer(tenantId, customerId);
  }
}
