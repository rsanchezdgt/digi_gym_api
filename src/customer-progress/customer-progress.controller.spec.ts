import { Test, TestingModule } from '@nestjs/testing';
import { CustomerProgressController } from './customer-progress.controller';
import { CustomerProgressService } from './customer-progress.service';

describe('CustomerProgressController', () => {
  let controller: CustomerProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerProgressController],
      providers: [CustomerProgressService],
    }).compile();

    controller = module.get<CustomerProgressController>(CustomerProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
