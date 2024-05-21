import { Controller, Post, Body, Req, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateGymUserDto } from 'src/users/dto/create-gym-user.dto';
import { EditGymUserDto } from 'src/users/dto/edit-gym-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-gym-user')
  createGymUser(@Req() req, @Body() createGymUserDto: CreateGymUserDto) {
    const tenantId = req.query['tenantId'];
    return this.authService.createGymUser(tenantId, createGymUserDto);
  }

  @Patch('edit-gym-user/:id')
  editGymUser(@Req() req, @Param('id') id: string, @Body() editGymUserDto: EditGymUserDto) {
    const tenantId = req.query['tenantId'];
    return this.authService.editGymUser(tenantId, id, editGymUserDto);
  }

  @Patch('disable-gym-user/:id')
  disableGymUser(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.authService.disableGymUser(tenantId, id);
  }

  @Patch('enable-gym-user/:id')
  enableGymUser(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.authService.enableGymUser(tenantId, id);
  }
}
