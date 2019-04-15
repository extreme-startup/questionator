import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { QuestionDto } from './dto/question.dto';
import { AnswerDto } from './dto/answer.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {

    constructor(private questionService: QuestionService) {}

    @Get()
    @ApiResponse({ status: 200, type: QuestionDto, isArray: true })
    async findAll(): Promise<QuestionDto[]> {
        return await this.questionService.findAll();
    }

  // todo it's a temporary solution and will be implemented in #23/24 stories
    @Get('random')
    async getRandom(): Promise<QuestionDto> {
        return await this.questionService.getRandom();
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: QuestionDto })
    async findOneById(@Param('id') id: string): Promise<QuestionDto> {
        return await this.questionService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 200, type: QuestionDto })
    async create(@Body() question: QuestionDto): Promise<QuestionDto> {
        return await this.questionService.insert(question);
    }

    @Put(':id')
    async update(@Body() updatedQuestion: QuestionDto, @Param('id') id: string): Promise<QuestionDto> {
        const oldQuestion = await this.questionService.findById(id);
        return await this.questionService.update(oldQuestion, updatedQuestion);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.questionService.delete(id);
    }

    @Post('reply/:askedQuestionId')
    reply(@Body() answer: string, @Param() { askedQuestionId }): Promise<AnswerDto> {
        return this.questionService.reply(askedQuestionId, answer);
    }
}
