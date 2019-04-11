import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { AskedQuestion } from '../../entity/AskedQuestion';

@Injectable()
export class ResultLoggerService {
  constructor(
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
  ) {}

  async getAllResults(contestId: number, time: number): Promise<AskedQuestion[]> {
    try {
      if (contestId && time) {
        return await this.askedQuestionRepository.find({
          where: {
            contestContenderId: contestId,
            answeredOn: Raw(alias => `DATE_FORMAT(${alias}, "%f") > ${time}`),
          },
          order: {
            answeredOn: 'ASC',
          },
          select: [
            'contestContenderId',
            'score',
            'answeredOn',
          ],
        });
      }
      if (contestId) {
        return await this.askedQuestionRepository.find({
          where: { contestContenderId: contestId },
          order: {
            answeredOn: 'ASC',
          },
          select: [
            'contestContenderId',
            'score',
            'answeredOn',
          ],
        });
      }
      return await this.askedQuestionRepository.find();
    } catch (err) {
      return err;
    }
  }
}
