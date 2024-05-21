import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { MembershipTypesService } from './membership-types.service';
import { CreateMembershipTypeDto } from './dto/create-membership-type.dto';
import { UpdateMembershipTypeDto } from './dto/update-membership-type.dto';

@Controller('membership-types')
export class MembershipTypesController {
  constructor(
    private readonly membershipTypesService: MembershipTypesService,
  ) {}

  @Post()
  create(@Req() req, @Body() createMembershipTypeDto: CreateMembershipTypeDto) {
    const tenantId = req.query['tenantId'];
    return this.membershipTypesService.create(
      tenantId,
      createMembershipTypeDto,
    );
  }

  @Get()
  findAll(@Req() req) {
    const tenantId = req.query['tenantId'];
    return this.membershipTypesService.findAll(tenantId);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateMembershipTypeDto: UpdateMembershipTypeDto,
  ) {
    const tenantId = req.query['tenantId'];
    return this.membershipTypesService.update(
      tenantId,
      id,
      updateMembershipTypeDto,
    );
  }

  @Post('remove/:id')
  remove(@Req() req, @Param('id') id: string) {
    const tenantId = req.query['tenantId'];
    return this.membershipTypesService.remove(tenantId, id);
  }
}
