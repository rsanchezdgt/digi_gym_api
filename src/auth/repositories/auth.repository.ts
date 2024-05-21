import { EditGymUserDto } from 'src/users/dto/edit-gym-user.dto';
import { FirebaseConfig } from '../../firebase-config';
import { CreateGymUserDto } from 'src/users/dto/create-gym-user.dto';

export class AuthRepository {
  public async createGymUser(
    tenantId: string,
    createGymUserDto: CreateGymUserDto,
  ): Promise<string> {
    const userRecord = await FirebaseConfig.auth.createUser({
      email: createGymUserDto.email,
      emailVerified: true,
      password: createGymUserDto.password,
      displayName: createGymUserDto.name,
    });
    await FirebaseConfig.auth.setCustomUserClaims(userRecord.uid, {
      type: createGymUserDto.type,
      tenantId: tenantId,
    });
    return userRecord.uid;
  }

  public async editGymUser(
    tenantId: string,
    id: string,
    editGymUserDto: EditGymUserDto,
  ): Promise<void> {
    await FirebaseConfig.auth.updateUser(id, {
      email: editGymUserDto.email,
      displayName: editGymUserDto.name,
    });
    await FirebaseConfig.auth.setCustomUserClaims(id, {
      type: editGymUserDto.type,
      tenantId: tenantId,
    });
  }

  public async disableGymUser(id: string): Promise<void> {
    await FirebaseConfig.auth.updateUser(id, {
      disabled: true,
    });
  }

  public async enableGymUser(id: string): Promise<void> {
    await FirebaseConfig.auth.updateUser(id, {
      disabled: false,
    });
  }
}
