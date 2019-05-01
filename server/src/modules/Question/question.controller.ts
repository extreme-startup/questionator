import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';
import { ResponseDto } from '../../models/response.dto';
import { QuestionCreateDto } from './dto/question-create.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiResponse({ status: 200, type: QuestionDto, isArray: true })
  public async findAll(): Promise<ResponseDto<QuestionDto[]>> {
    return await this.questionService.findAll();
  }

  // todo it's a temporary solution and will be implemented in #23/24 stories
  @Get('random')
  public async getRandom(): Promise<ResponseDto<QuestionDto>> {
    return await this.questionService.getRandom();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: QuestionDto })
  public async findOneById(
    @Param('id') id: string,
  ): Promise<ResponseDto<QuestionDto>> {
    return await this.questionService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 200, type: QuestionDto })
  public async create(
    @Body() question: QuestionCreateDto,
  ): Promise<ResponseDto<QuestionDto>> {
    return await this.questionService.insert(question);
  }

  @Put(':id')
  public async update(
    @Body() payload: QuestionDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<QuestionDto>> {
    return await this.questionService.update(id, payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.questionService.delete(id);
  }
}
