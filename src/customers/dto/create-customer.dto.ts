export class CreateCustomerDto {
  name: string;
  lastName: string;
  sex: boolean;
  idCard?: string;
  dateOfBirth?: string;
  nationality: string;
  nationalityOther: string;
  phone: string;
  email: string;
  membershipId: string;
  membershipCurrency: string;
  paidAmount: number;
  paymentMethod: string;
  membershipStartDate: string;
  membershipEndDate: string;
  metBy: string;
  metByOther: string;
  referredBy: string;
  notes: string;
  company: string;
  position: string;
}
