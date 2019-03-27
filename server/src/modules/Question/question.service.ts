import { Injectable } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { Questions } from '../../entity/Questions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Questions)
        private readonly questionRepository: Repository<Questions>,
    ) { }

    async findAll(): Promise<Questions[]> {
        try {
            return await this.questionRepository.find({});
        } catch (err) {
            return err;
        }
    }

    async findById(id: string): Promise<Questions> {
        try {
            return await this.questionRepository.findOne({ id });
        } catch (err) {
            return err;
        }
    }

    async insert(question: QuestionDto): Promise<QuestionDto> {
        const newQuestion = new Questions();

        Object.keys(question).forEach((key) => {
            newQuestion[key] = question[key];
        });

        try {
            return await this.questionRepository.save(newQuestion);
        } catch (err) {
            return err;
        }
    }

    async update(oldQuestion: Questions, updatedValues: QuestionDto): Promise<Questions> {
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
