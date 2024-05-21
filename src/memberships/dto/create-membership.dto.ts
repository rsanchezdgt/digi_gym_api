export class CreateMembershipDto {
  public name: string;
  public cost: number;
  public currency: string;
  public plan: string;
  public typeId: string;
  public description?: string;
}
