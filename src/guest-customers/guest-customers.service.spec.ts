import { Test, TestingModule } from '@nestjs/testing';
import { GuestCustomersService } from './guest-customers.service';

describe('GuestCustomersService', () => {
  let service: GuestCustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestCustomersService],
    }).compile();

    service = module.get<GuestCustomersService>(GuestCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
