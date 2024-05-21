import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestCustomerDto } from './create-guest-customer.dto';

export class UpdateGuestCustomerDto extends PartialType(
  CreateGuestCustomerDto,
) {}
