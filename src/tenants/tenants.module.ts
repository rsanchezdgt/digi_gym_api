import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantsRepository } from './repositories/tenants.repository';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository],
})
export class TenantsModule {}
