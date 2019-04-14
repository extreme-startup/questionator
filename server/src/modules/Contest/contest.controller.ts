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
import { Contest } from '../../entities/Contest';
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
    return this.contestService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() contest: ContestDto,
  ): Promise<UpdateResult> {
    return this.contestService.update(parseInt(id, 10), contest);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.contestService.delete(parseInt(id, 10));
  }

  @Get(':id/questions')
  findQuestions(@Param('id') id: string): Promise<any> {
    return this.contestService.findAllQuestions(parseInt(id, 10));
  }
}
