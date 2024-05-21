import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MembershipsModule } from './memberships/memberships.module';
import { CustomersModule } from './customers/customers.module';
import { GuestCustomersModule } from './guest-customers/guest-customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MembershipTypesModule } from './membership-types/membership-types.module';
import { PaymentsModule } from './payments/payments.module';
import { AttendancesModule } from './attendances/attendances.module';
import { TenantsModule } from './tenants/tenants.module';
import { CustomerProgressModule } from './customer-progress/customer-progress.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    MembershipsModule,
    CustomersModule,
    GuestCustomersModule,
    UsersModule,
    AuthModule,
    MembershipTypesModule,
    PaymentsModule,
    AttendancesModule,
    TenantsModule,
    CustomerProgressModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
