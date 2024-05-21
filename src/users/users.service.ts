import { UsersRepository } from './repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditGymUserDto } from './dto/edit-gym-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(tenantId: string, createUserDto: CreateUserDto, uid: string) {
    return this.usersRepository.createUser(tenantId, createUserDto, uid);
  }

  findAll(tenantId: string) {
    return this.usersRepository.getAll(tenantId);
  }

  gymUsers(tenantId: string) {
    return this.usersRepository.gymUsers(tenantId);
  }

  update(tenantId: string, id: string, updateUserDto: EditGymUserDto) {
    return this.usersRepository.updateUser(tenantId, id, updateUserDto);
  }

  enableUser(tenantId: string, id: string) {
    return this.usersRepository.enableUser(tenantId, id);
  }

  disableUser(tenantId: string, id: string) {
    return this.usersRepository.disableUser(tenantId, id);
  }
}
