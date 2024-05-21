import { MembershipTypesRepository } from './../membership-types/repositories/membership-types.repository';
import { MembershipsRepository } from './repositories/memberships.repository';
import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipsService {
  constructor(
    private membershipsRepository: MembershipsRepository,
    private membershipTypesRepository: MembershipTypesRepository,
  ) {}

  create(tenantId: string, createMembershipDto: CreateMembershipDto) {
    return this.membershipsRepository.create(tenantId, createMembershipDto);
  }

  async findAll(tenantId: string) {
    const types = await this.membershipTypesRepository.getAll(tenantId);
    return await this.membershipsRepository.getAll(tenantId, types);
  }

  async getById(tenantId: string, id: string) {
    return await this.membershipsRepository.getById(tenantId, id);
  }

  update(
    tenantId: string,
    id: string,
    updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsRepository.update(tenantId, id, updateMembershipDto);
  }

  remove(tenantId: string, id: string) {
    return this.membershipsRepository.remove(tenantId, id);
  }
}
