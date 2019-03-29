import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

import { ContestService } from './contest.service';
import { Contest } from '../../entity/Contest';
import { IContestDto } from './contest.interface';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Post()
  create(@Body() contest: IContestDto): Promise<InsertResult> {
    return this.contestService.create(contest);
  }

  @Get()
  findAll(): Promise<Contest[]> {
    return this.contestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contest> {
    return this.contestService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() contest: IContestDto,
  ): Promise<UpdateResult> {
    return this.contestService.update(parseInt(id, 10), contest);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.contestService.delete(parseInt(id, 10));
  }
}
