import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
  // UseInterceptors,
  // UploadedFile,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { RenewMembershipDto } from './dto/renew-membership.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  create(
    @Req() req,
    @Body() createCustomerDto: CreateCustomerDto,
    // @UploadedFile() file: Express.Multer.File,
  ) {
    const tenantId = req.query['tenantId'];
    return this.customersService.create(tenantId, createCustomerDto, null);
  }

  @Post('send-qr-email')
  @UseInterceptors(FileInterceptor('file'))
  sendQrEmail(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
) {
    const { customerEmail } = body;
    return this.customersService.sendQrEmail(customerEmail, file);
  }

  @Get()
  findAll(@Req() req) {
    const tenantId = req.query['tenantId'];
    return this.customersService.findAll(tenantId);
  }
  
  @Get('paginated')
  findPaginated(@Req() req) {
    const tenantId = req.query['tenantId'];
    const after = req.query['after'];
    return this.customersService.findPaginated(tenantId, after);
  }

  @Get('get-membership-end-date/:id')
  getMembershipEndDate(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.customersService.getMembershipEndDate(tenantId, id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const tenantId = req.query['tenantId'];
    return this.customersService.update(tenantId, id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.customersService.remove(tenantId, id);
  }

  @Post('renew-membership')
  renewMembership(@Req() req, @Body() renewMembershipDto: RenewMembershipDto) {
    const tenantId = req.query['tenantId'];
    return this.customersService.renewMembership(tenantId, renewMembershipDto);
  }
}
