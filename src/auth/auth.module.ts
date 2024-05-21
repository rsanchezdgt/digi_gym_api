import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UsersService, UsersRepository],
})
export class AuthModule {}
