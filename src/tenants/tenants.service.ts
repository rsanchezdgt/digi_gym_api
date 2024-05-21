import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsRepository } from './repositories/tenants.repository';

@Injectable()
export class TenantsService {
  constructor(private tenantsRepository: TenantsRepository) {}

  create(createTenantDto: CreateTenantDto) {
    return this.tenantsRepository.create(createTenantDto);
  }

  findAll() {
    return this.tenantsRepository.getAll();
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: string, status: boolean) {
    return `This action removes a #${id} tenant`;
  }
}
