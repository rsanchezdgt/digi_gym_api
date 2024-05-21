import {
  Controller,
  Get,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { GuestCustomersService } from './guest-customers.service';
import { CreateGuestCustomerDto } from './dto/create-guest-customer.dto';

@Controller('guest-customers')
export class GuestCustomersController {
  constructor(private readonly guestCustomersService: GuestCustomersService) {}

  @Get()
  async findAll(@Req() req, @Res() res) {
    const tenantId = req.query['tenantId'];
    if (!tenantId) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'UNAUTHORIZED',
      });
    } else {
      try {
        const data = await this.guestCustomersService.findAll(tenantId);
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: data,
        });
      } catch (_) {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
    }
  }
  
  @Get('paginated')
  async findPaginated(@Req() req, @Res() res) {
    const tenantId = req.query['tenantId'];
    if (!tenantId) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'UNAUTHORIZED',
      });
    } else {
      try {
        const after = req.query['after'];
        const data = await this.guestCustomersService.findPaginated(tenantId, after);
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: data,
        });
      } catch (_) {
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
    }
  }

  @Post()
  create(@Req() req, @Body() createCustomerDto: CreateGuestCustomerDto) {
    const tenantId = req.query['tenantId'];
    return this.guestCustomersService.create(tenantId, createCustomerDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.guestCustomersService.remove(tenantId, id);
  }
}
