import { Module } from '@nestjs/common';
import { MembershipTypesService } from './membership-types.service';
import { MembershipTypesController } from './membership-types.controller';
import { MembershipTypesRepository } from './repositories/membership-types.repository';

@Module({
  controllers: [MembershipTypesController],
  providers: [MembershipTypesService, MembershipTypesRepository],
})
export class MembershipTypesModule {}
