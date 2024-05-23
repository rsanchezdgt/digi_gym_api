import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class RenewMembershipDto extends PartialType(CreateCustomerDto) {
  membershipId: string;
  paidAmount: number;
  paymentMethod: string;
  membershipStartDate: string;
  membershipEndDate: string;
  customerId: string;
}
