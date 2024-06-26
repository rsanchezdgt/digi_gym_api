import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  name: string;
  lastName: string;
  idCard: string;
  dateOfBirth: string;
  nationality: string;
  phone: string;
  email: string;
  metBy: string;
  sex: boolean;
  userId: string;
}
