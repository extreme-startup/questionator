import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compile } from 'handlebars';
import * as safeEval from 'safe-eval';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
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

    // todo it's a temporary solution and will be implemented in #23/24 stories
    async getRandom(): Promise<Question> {
        try {
            return await this.questionRepository.createQueryBuilder()
                .orderBy('RAND()')
                .getOne();
        } catch (err) {
            return err;
        }
    }

    async findById(id: string): Promise<Question> {
        try {
            return await this.questionRepository.findOne(id);
        } catch (err) {
            return err;
        }
    }

    async insert(question: QuestionDto): Promise<Question> {
        const newQuestion = this.questionRepository.create(question);

        try {
            return await this.questionRepository.save(newQuestion);
        } catch (err) {
            return err;
        }
    }

    async update(oldQuestion: Question, updatedValues: QuestionDto): Promise<Question> {
        const updatedQuestion = this.questionRepository.create({ ...oldQuestion, ...updatedValues });

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

    async ask(questionId: string, contenderId: number): Promise<AskedQuestion> {
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
            let context;
            try {
                // should we pass anything to context generator here?
                context = safeEval(question.contextGenerator)();
                newAskedQuestion.question = compile(question.text)(context);
                newAskedQuestion.answer = compile(question.answer)(context);
            } catch (error) {
                throw new Error(`Can't eval question#${question.id}: ${error}`);
            }
        }

        try {
            return this.askedQuestionRepository.save(newAskedQuestion);
        } catch (error) {
            throw new HttpException(`Can't save asked question: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async reply(askedQuestionId: string, answer: string): Promise<AskedQuestion> {
        const askedQuestion = await this.askedQuestionRepository.findOne({ id: askedQuestionId });

        if (!askedQuestion) {
            throw new HttpException('Asked question not found', HttpStatus.NOT_FOUND);
        }

        if (askedQuestion.answeredOn) {
            throw new HttpException('Asked question was already replied', HttpStatus.FORBIDDEN);
        }

        askedQuestion.answeredOn = new Date();
        // TODO: process player score here
        askedQuestion.isCorrect = answer === askedQuestion.answer;

        try {
            return this.askedQuestionRepository.save(askedQuestion);
        } catch (error) {
            throw new HttpException(`Can't save asked question: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }
}
