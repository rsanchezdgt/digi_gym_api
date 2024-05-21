import { Module } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { MembershipsRepository } from './repositories/memberships.repository';
import { MembershipTypesRepository } from 'src/membership-types/repositories/membership-types.repository';

@Module({
  controllers: [MembershipsController],
  providers: [
    MembershipsService,
    MembershipsRepository,
    MembershipTypesRepository,
  ],
})
export class MembershipsModule {}
