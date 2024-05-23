export class CreateCustomerDto {
  name: string;
  lastName: string;
  sex: boolean;
  idCard: string;
  dateOfBirth: string;
  nationality: string;
  phone: string;
  email: string;
  membershipId: string;
  membershipCurrency: string;
  paidAmount: number;
  paymentMethod: string;
  membershipStartDate: string;
  membershipEndDate: string;
  metBy: string; // Referido || Otro -> enable textfield
}
