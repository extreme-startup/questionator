import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entity/Question';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
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
        const newQuestion = new Question();

        try {
            return await this.questionRepository.save({ ...newQuestion, ...question });
        } catch (err) {
            return err;
        }
    }

    async update(oldQuestion: Question, updatedValues: QuestionDto): Promise<Question> {
        const updatedQuestion = { ...oldQuestion, ...updatedValues };

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
}
