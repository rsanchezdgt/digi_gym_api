import { FirebaseConfig } from '../../firebase-config';
import { Membership } from '../entities/membership.entity';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { UpdateMembershipDto } from '../dto/update-membership.dto';
import { MembershipType } from 'src/membership-types/entities/membership-type.entity';

export class MembershipsRepository {
  getMembershipsCollection(
    tenantId: string,
  ): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return FirebaseConfig.membershipCollection(`tenants/${tenantId}`);
  }

  public async getAll(
    tenantId: string,
    types: MembershipType[],
  ): Promise<Membership[]> {
    const snapshot = await this.getMembershipsCollection(tenantId).get();

    const membershipCollections = snapshot.docs.map((membershipDoc) => {
      const membership = new Membership();
      membership.id = membershipDoc.id;
      Object.assign(membership, membershipDoc.data());
      const membershipType = types.filter((e) => e.id == membership.typeId)[0];
      membership.type = membershipType.name;
      return membership;
    });

    return membershipCollections;
  }

  public async getById(tenantId: string, id: string): Promise<Membership> {
    const doc = await this.getMembershipsCollection(tenantId).doc(id).get();

    const membership = new Membership();
    membership.id = doc.id;
    Object.assign(membership, doc.data());

    return membership;
  }

  public async create(
    tenantId: string,
    createMembershipDto: CreateMembershipDto,
  ) {
    return await this.getMembershipsCollection(tenantId).add(
      createMembershipDto,
    );
  }

  public async update(
    tenantId: string,
    id: string,
    updateMembershipDto: UpdateMembershipDto,
  ) {
    return await this.getMembershipsCollection(tenantId).doc(id).update({
      name: updateMembershipDto.name,
      cost: updateMembershipDto.cost,
      currency: updateMembershipDto.currency,
      plan: updateMembershipDto.plan,
      typeId: updateMembershipDto.typeId,
      description: updateMembershipDto.description,
    });
  }

  public async remove(tenantId: string, id: string) {
    await this.getMembershipsCollection(tenantId).doc(id).update({
      active: false,
    });
  }
}
