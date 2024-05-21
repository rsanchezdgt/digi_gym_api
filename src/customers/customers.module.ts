import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { PaymentsService } from 'src/payments/payments.service';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { MembershipsRepository } from 'src/memberships/repositories/memberships.repository';
import { MembershipsService } from 'src/memberships/memberships.service';
import { MembershipTypesRepository } from 'src/membership-types/repositories/membership-types.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepository,
    AuthService,
    AuthRepository,
    UsersService,
    UsersRepository,
    PaymentsService,
    PaymentsRepository,
    MembershipsService,
    MembershipsRepository,
    MembershipTypesRepository,
  ],
})
export class CustomersModule {}
