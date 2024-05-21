import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  create(@Req() req, @Body() createMembershipDto: CreateMembershipDto) {
    const tenantId = req.query['tenantId'];
    return this.membershipsService.create(tenantId, createMembershipDto);
  }

  @Get()
  findAll(@Req() req) {
    const tenantId = req.query['tenantId'];
    return this.membershipsService.findAll(tenantId);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    const tenantId = req.query['tenantId'];
    return this.membershipsService.update(tenantId, id, updateMembershipDto);
  }

  @Post('remove/:id')
  remove(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.membershipsService.remove(tenantId, id);
  }
}
