import { Injectable } from '@nestjs/common';
import { GuestCustomersRepository } from './repositories/guest-customers.repository';
import { CreateGuestCustomerDto } from './dto/create-guest-customer.dto';

@Injectable()
export class GuestCustomersService {
  constructor(private guestCustomersRepository: GuestCustomersRepository) {}

  findAll(tenantId: string) {
    return this.guestCustomersRepository.getAll(tenantId);
  }
  
  findPaginated(tenantId: string, after?: string) {
    return this.guestCustomersRepository.getPaginated(tenantId, after);
  }

  create(tenantId: string, createGuestCustomerDto: CreateGuestCustomerDto) {
    return this.guestCustomersRepository.create(
      tenantId,
      createGuestCustomerDto,
    );
  }

  remove(tenantId: string, id: string) {
    return this.guestCustomersRepository.deleteOne(tenantId, id);
  }
}
