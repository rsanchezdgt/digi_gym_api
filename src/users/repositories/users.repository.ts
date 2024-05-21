import { FirebaseConfig } from '../../firebase-config';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditGymUserDto } from '../dto/edit-gym-user.dto';
import { User } from '../entities/user.entity';

export class UsersRepository {
  private getUserssCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.userCollection(`tenants/${tenantId}`);
  }

  public async getAll(tenantId: string): Promise<User[]> {
    const snapshot = await this.getUserssCollection(tenantId).get();

    const userCollections = snapshot.docs.map((userDoc) => {
      const user = new User();
      user.id = userDoc.id;
      Object.assign(user, userDoc.data());
      return user;
    });

    return userCollections;
  }

  public async gymUsers(tenantId: string): Promise<User[]> {
    const snapshot = await this.getUserssCollection(tenantId)
      .where('type', '!=', 'C')
      .get();

    const userCollections = snapshot.docs.map((userDoc) => {
      const user = new User();
      user.id = userDoc.id;
      Object.assign(user, userDoc.data());
      return user;
    });
    return userCollections;
  }

  public async createUser(
    tenantId: string,
    createUserDto: CreateUserDto,
    uid: string,
  ) {
    await this.getUserssCollection(tenantId)
      .doc(uid)
      .set(Object.assign({}, createUserDto));
  }

  public async updateUser(
    tenantId: string,
    id: string,
    updateUserDto: EditGymUserDto,
  ) {
    await this.getUserssCollection(tenantId).doc(id).update({
      name: updateUserDto.name,
      email: updateUserDto.email,
      type: updateUserDto.type,
    });
  }

  public async disableUser(tenantId: string, id: string) {
    await this.getUserssCollection(tenantId).doc(id).update({
      enabled: false,
    });
  }

  public async enableUser(tenantId: string, id: string) {
    await this.getUserssCollection(tenantId).doc(id).update({
      enabled: true,
    });
  }
}
