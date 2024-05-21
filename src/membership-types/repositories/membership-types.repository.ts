import { FirebaseConfig } from '../../firebase-config';
import { CreateMembershipTypeDto } from '../dto/create-membership-type.dto';
import { UpdateMembershipTypeDto } from '../dto/update-membership-type.dto';
import { MembershipType } from '../entities/membership-type.entity';

export class MembershipTypesRepository {
  getMembershipTypesCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.membershipTypeCollection(`tenants/${tenantId}`);
  }

  public async getAll(tenantId: string): Promise<MembershipType[]> {
    const snapshot = await this.getMembershipTypesCollection(tenantId).get();

    const membershipTypeCollections = snapshot.docs.map((membershipTypeDoc) => {
      const membership = new MembershipType();
      membership.id = membershipTypeDoc.id;
      Object.assign(membership, membershipTypeDoc.data());
      return membership;
    });

    return membershipTypeCollections;
  }

  public async create(
    tenantId: string,
    createMembershipTypeDto: CreateMembershipTypeDto,
  ) {
    createMembershipTypeDto['active'] = true;
    return await this.getMembershipTypesCollection(tenantId).add(
      createMembershipTypeDto,
    );
  }

  public async update(
    tenantId: string,
    id: string,
    updateMembershipTypeDto: UpdateMembershipTypeDto,
  ) {
    return await this.getMembershipTypesCollection(tenantId).doc(id).update({
      name: updateMembershipTypeDto.name,
    });
  }

  public async remove(tenantId: string, id: string) {
    await this.getMembershipTypesCollection(tenantId).doc(id).update({
      active: false,
    });
  }
}
