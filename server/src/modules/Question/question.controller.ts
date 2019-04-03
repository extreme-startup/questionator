import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService) {}

    @Get()
    async findAll(): Promise<QuestionDto[]> {
        return await this.questionService.findAll();
    }

    @Get('random')
    async getRandom(): Promise<QuestionDto> {
        return await this.questionService.getRandom();
    }

    @Get(':id')
    async findOneById(@Param() params): Promise<QuestionDto> {
        return await this.questionService.findById(params.id);
    }

    @Post()
    async create(@Body() quesition: QuestionDto): Promise<QuestionDto> {
        return await this.questionService.insert(quesition);
    }

    @Put(':id')
    async update(@Body() updatedQuestion: QuestionDto, @Param() params): Promise<QuestionDto> {
        const oldQuestion = await this.questionService.findById(params.id);
        return await this.questionService.update(oldQuestion, updatedQuestion);
    }

    @Delete(':id')
    async delete(@Param() params) {
        return await this.questionService.delete(params.id);

    }
}
