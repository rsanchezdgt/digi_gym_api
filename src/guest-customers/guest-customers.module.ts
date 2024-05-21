import { Module } from '@nestjs/common';
import { GuestCustomersService } from './guest-customers.service';
import { GuestCustomersController } from './guest-customers.controller';
import { GuestCustomersRepository } from './repositories/guest-customers.repository';

@Module({
  controllers: [GuestCustomersController],
  providers: [GuestCustomersService, GuestCustomersRepository],
})
export class GuestCustomersModule {}
