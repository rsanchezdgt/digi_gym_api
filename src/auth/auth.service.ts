import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { CreateGymUserDto } from 'src/users/dto/create-gym-user.dto';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { EditGymUserDto } from 'src/users/dto/edit-gym-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private usersService: UsersService,
  ) {}

  async createGymUser(tenantId: string, createGymUserDto: CreateGymUserDto) {
    const uid = await this.authRepository.createGymUser(
      tenantId,
      createGymUserDto,
    );
    const createUserDto = new CreateUserDto();
    createUserDto.name = createGymUserDto.name;
    createUserDto.email = createGymUserDto.email;
    createUserDto.type = createGymUserDto.type;
    await this.usersService.create(tenantId, createUserDto, uid);
    return uid;
  }

  async editGymUser(tenantId: string, id: string, editGymUserDto: EditGymUserDto) {
    await this.authRepository.editGymUser(tenantId, id, editGymUserDto);
    await this.usersService.update(tenantId, id, editGymUserDto);
  }

  async disableGymUser(tenantId: string, id: string) {
    await this.authRepository.disableGymUser(id);
    await this.usersService.disableUser(tenantId, id);
  }

  async enableGymUser(tenantId: string, id: string) {
    await this.authRepository.enableGymUser(id);
    await this.usersService.enableUser(tenantId, id);
  }
}
