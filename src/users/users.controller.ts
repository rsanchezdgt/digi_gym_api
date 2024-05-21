import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Req() req) {
    const tenantId = req.query['tenantId'];
    return this.usersService.findAll(tenantId);
  }

  @Get('gym-users')
  gymUsers(@Req() req) {
    const tenantId = req.query['tenantId'];
    return this.usersService.gymUsers(tenantId);
  }
}
