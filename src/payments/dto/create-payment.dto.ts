export class CreatePaymentDto {
  public customerId: string;
  public paidAmount: number;
  public currency: string;
  public paymentDate: string;
  public membershipId: string;
  public membershipName: string;
  public isReferred: boolean;
  public customerSex: boolean;
  public customerFullName: string;
}
