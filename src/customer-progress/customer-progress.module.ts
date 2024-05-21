import { Module } from '@nestjs/common';
import { CustomerProgressService } from './customer-progress.service';
import { CustomerProgressController } from './customer-progress.controller';
import { CustomerProgressRepository } from './repositories/customer-progress.repository';

@Module({
  controllers: [CustomerProgressController],
  providers: [CustomerProgressService, CustomerProgressRepository],
})
export class CustomerProgressModule {}
