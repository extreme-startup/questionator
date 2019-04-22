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
import { ApiResponse } from '@nestjs/swagger';

import { ContestService } from './contest.service';
import { Contest } from '../../entity/Contest';
import { ContestDto } from './contest.dto';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Post()
  create(@Body() contest: ContestDto): Promise<InsertResult> {
    return this.contestService.create(contest);
  }

  @Get()
  @ApiResponse({ status: 200, type: Contest, isArray: true })
  findAll(): Promise<Contest[]> {
    return this.contestService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Contest })
  findOne(@Param('id') id: string): Promise<Contest> {
    return this.contestService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() contest: ContestDto,
  ): Promise<UpdateResult> {
    return this.contestService.update(id, contest);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.contestService.delete(id);
  }

  @Get(':id/questions')
  findQuestions(@Param('id') id: string): Promise<any> {
    return this.contestService.findAllQuestions(id);
  }
}
