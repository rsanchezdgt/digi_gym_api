import { FirebaseConfig } from '../../firebase-config';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { Tenant } from '../entities/tenant.entity';

export class TenantsRepository {
  private getTenantsCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.tenantsCollection('');
  }

  public async getAll(): Promise<Tenant[]> {
    const snapshot = await this.getTenantsCollection().get();

    const tenantsCollections = snapshot.docs.map((tenantDoc) => {
      const tenant = new Tenant();
      tenant.id = tenantDoc.id;
      Object.assign(tenant, tenantDoc.data());
      return tenant;
    });

    return tenantsCollections;
  }

  public async create(createTenantDto: CreateTenantDto) {
    return await this.getTenantsCollection().add(createTenantDto);
  }
}
