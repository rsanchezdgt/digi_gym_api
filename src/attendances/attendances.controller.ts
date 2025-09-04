import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Req() req, @Body() createAttendanceDto: CreateAttendanceDto) {
    const tenantId = req.query['tenantId'];
    return this.attendancesService.create(tenantId, createAttendanceDto);
  }

  @Get('get-by-customer/:id')
  getByCustomer(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.attendancesService.getByCustomer(tenantId, id);
  }

  @Get('get-by-membership/:id')
  getByMembership(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.attendancesService.getByMembership(tenantId, id);
  }
}
