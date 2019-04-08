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
}
