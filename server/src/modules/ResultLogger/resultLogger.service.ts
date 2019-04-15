import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import * as dateFormat from 'dateformat';
import { AskedQuestion } from '../../entity/AskedQuestion';

@Injectable()
export class ResultLoggerService {
  constructor(
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
  ) {}

  async getAllResults(sessionId?: number, time?: number): Promise<AskedQuestion[]> {
    try {
      if (sessionId && time) {
        const MoreThanDate = (date: Date) => MoreThan(dateFormat(date, 'yyyy-mm-dd HH:MM:ss'));
        return await this.askedQuestionRepository.find({
          where: {
            sessionId,
            answeredOn: MoreThanDate(new Date(time)),
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
      if (sessionId) {
        return await this.askedQuestionRepository.find({
          where: { sessionId },
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
