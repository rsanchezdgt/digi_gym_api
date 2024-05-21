import { Injectable } from '@nestjs/common';
import { CreateMembershipTypeDto } from './dto/create-membership-type.dto';
import { UpdateMembershipTypeDto } from './dto/update-membership-type.dto';
import { MembershipTypesRepository } from './repositories/membership-types.repository';

@Injectable()
export class MembershipTypesService {
  constructor(private membershipTypesRepository: MembershipTypesRepository) {}

  create(tenantId: string, createMembershipTypeDto: CreateMembershipTypeDto) {
    return this.membershipTypesRepository.create(
      tenantId,
      createMembershipTypeDto,
    );
  }

  findAll(tenantId: string) {
    return this.membershipTypesRepository.getAll(tenantId);
  }

  update(
    tenantId: string,
    id: string,
    updateMembershipTypeDto: UpdateMembershipTypeDto,
  ) {
    return this.membershipTypesRepository.update(tenantId, id, updateMembershipTypeDto);
  }

  remove(tenantId: string, id: string) {
    return this.membershipTypesRepository.remove(tenantId, id);
  }
}
