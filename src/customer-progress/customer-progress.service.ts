import { Injectable } from '@nestjs/common';
import { CreateCustomerProgressDto } from './dto/create-customer-progress.dto';
import { CustomerProgressRepository } from './repositories/customer-progress.repository';

@Injectable()
export class CustomerProgressService {
  constructor(private customerProgressRepository: CustomerProgressRepository) {}

  create(
    tenantId: string,
    createCustomerProgressDto: CreateCustomerProgressDto,
  ) {
    return this.customerProgressRepository.create(
      tenantId,
      createCustomerProgressDto,
    );
  }

  getByCustomer(tenantId: string, customerId: string) {
    return this.customerProgressRepository.getByCustomer(tenantId, customerId);
  }
}
