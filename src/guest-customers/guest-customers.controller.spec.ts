import { Test, TestingModule } from '@nestjs/testing';
import { GuestCustomersController } from './guest-customers.controller';
import { GuestCustomersService } from './guest-customers.service';

describe('GuestCustomersController', () => {
  let controller: GuestCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestCustomersController],
      providers: [GuestCustomersService],
    }).compile();

    controller = module.get<GuestCustomersController>(GuestCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
