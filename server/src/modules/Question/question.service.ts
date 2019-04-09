import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compile } from 'handlebars';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { AskedQuestionDto } from './dto/askedQuestion.dto';
import { AnswerDto } from './dto/answer.dto';
import { QuestionType } from '../../constants';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(AskedQuestion)
        private readonly askedQuestionRepository: Repository<AskedQuestion>,
    ) { }

    async findAll(): Promise<Question[]> {
        try {
            return await this.questionRepository.find();
        } catch (err) {
            return err;
        }
    }

    async findById(id: string): Promise<Question> {
        try {
            return await this.questionRepository.findOne({ id });
        } catch (err) {
            return err;
        }
    }

    async insert(question: QuestionDto): Promise<QuestionDto> {
        const newQuestion = new Question();

        Object.keys(question).forEach((key) => {
            newQuestion[key] = question[key];
        });

        try {
            return await this.questionRepository.save(newQuestion);
        } catch (err) {
            return err;
        }
    }

    async update(oldQuestion: Question, updatedValues: QuestionDto): Promise<Question> {
        const updatedQuestion = oldQuestion;

        Object.keys(updatedValues).forEach((key) => {
            updatedQuestion[key] = updatedValues[key];
        });

        try {
            return await this.questionRepository.save(updatedQuestion);
        } catch (err) {
            return err;
        }

    }

    async delete(id: string) {
        try {
            return await this.questionRepository.delete({ id });
        } catch (err) {
            return err;
        }
    }

    async ask(contenderId: string, questionId: string): Promise<AskedQuestionDto> {
        const question = await this.questionRepository.findOne({ id: questionId });

        if (!question) {
            throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
        }

        const newAskedQuestion = new AskedQuestion();
        newAskedQuestion.contestContenderId = contenderId;
        newAskedQuestion.questionId = questionId;
        newAskedQuestion.askedOn = new Date();
        newAskedQuestion.score = question.value;

        if (question.type === QuestionType.STATIC) {
            newAskedQuestion.question = question.text;
            newAskedQuestion.answer = question.answer;
        } else {
            newAskedQuestion.question = question.text;
            newAskedQuestion.answer = question.answer;
        }
    }

    async reply(askedQuestionId: string, answer: string): Promise<AnswerDto> { return  }
}
