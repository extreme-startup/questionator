import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { ManageSessionService } from './manage-session.service';
import { ManageSessionDto } from './ManageSession.dto';

@Controller('manage-session')
export class ManageSessionController {
  constructor(private msService: ManageSessionService) {}

  @Get()
  public list(): Promise<ManageSessionDto[]> {
    return this.msService.findAll();
  }

  @Get(':id')
  public getById(@Param() id): Promise<ManageSessionDto> {
    return this.msService.findById(id);
  }

  @Post()
  public create(@Body() session): Promise<ManageSessionDto> {
    return this.msService.create(session);
  }

  @Put(':id')
  updateSession(@Param() id: number, @Body() session): Promise<ManageSessionDto> {
    return this.msService.update(id, session);
  }
}
