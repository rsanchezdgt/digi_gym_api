import { Test, TestingModule } from '@nestjs/testing';
import { CustomerProgressService } from './customer-progress.service';

describe('CustomerProgressService', () => {
  let service: CustomerProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerProgressService],
    }).compile();

    service = module.get<CustomerProgressService>(CustomerProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
