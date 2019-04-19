import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { QuestionDto } from './dto/question.dto';
import { QuestionType } from '../../constants';
import { Context, runInContext , createContext } from 'vm';
import { promisify } from 'util';
import { compile } from 'handlebars';
import { get } from 'scrabbler';
import axios from 'axios';
import * as numberToWords from 'number-to-words';
import * as intseq from 'integer-sequences';
import * as _ from 'lodash';

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

    async ask(questionId: string, contenderId: string): Promise<AskedQuestion> {
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
            const rawContext = runInContext(
              question.contextGenerator,
              this.dynamicQuestionSandbox,
            );
            newAskedQuestion.context = JSON.stringify(rawContext);
            newAskedQuestion.question = compile(question.text)(rawContext); // what is {{a}} + {{b}}
        }

        try {
            return this.askedQuestionRepository.save(newAskedQuestion);
        } catch (error) {
            throw new HttpException(`Can't save asked question: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async reply(askedQuestionId: string, answer: string): Promise<AskedQuestion> {
        let askedQuestion;
        try {
            askedQuestion = await this.askedQuestionRepository.findOneOrFail({
                where: { id: askedQuestionId },
                join: {
                    alias: 'question',
                    leftJoinAndSelect: {
                        type: 'question.type',
                        answerCheck: 'question.answerCheck',
                    },
                },
            });
        } catch (e) {
            throw new HttpException('Asked question not found', HttpStatus.NOT_FOUND);
        }

        if (askedQuestion.answeredOn) {
            throw new HttpException('Asked question was already replied', HttpStatus.FORBIDDEN);
        }

        askedQuestion.answeredOn = new Date();
        // TODO: process player score here
        if (askedQuestion.question.type === QuestionType.STATIC) {
            askedQuestion.isCorrect = answer === askedQuestion.answer;
        } else {
            const answerCheck = runInContext(
              askedQuestion.question.answerCheck,
              this.dynamicQuestionSandbox,
            );
            askedQuestion.isCorrect = answerCheck(answer, JSON.parse(askedQuestion.context));
        }

        try {
            return this.askedQuestionRepository.save(askedQuestion);
        } catch (error) {
            throw new HttpException(`Can't save asked question: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    private readonly dynamicQuestionSandbox: Context = createContext({
        axios,
        numberToWords,
        intseq,
        _,
        scrabbler: promisify(get),
    });

    private async evalInSandbox(code, ...args) {
        let result;
        try {
            result = runInContext(
              code,
              this.dynamicQuestionSandbox,
            );

            if (typeof result === 'function') {
                result = result(...args);
            }
            if (result instanceof Promise) {
                result = await result;
            }
        } catch (error) {
            throw new Error(`Cant eval stored expression: ${error}`);
        }
        return result;
    }
}
