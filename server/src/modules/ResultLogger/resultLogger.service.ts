import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dateFormat from 'dateformat';
import { AskedQuestion } from '../../entity/AskedQuestion';
import { User } from '../../entity/User';

@Injectable()
export class ResultLoggerService {
  constructor(
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllResults(sessionId?: number, time?: number, userId?: string): Promise<AskedQuestion[]> {
    try {
      if (sessionId && time) {
        return await this.askedQuestionRepository
          .createQueryBuilder('question')
          .select([
            'question.contestContenderId',
            'question.score',
            'question.answeredOn',
          ])
          .addSelect(subQuery => {
            return subQuery
              .select('user.email', 'email')
              .from(User, 'user')
              .where('user.id = question.contestContenderId');
          }, 'user')
          .where('question.sessionId = :sessionId', { sessionId })
          .andWhere('question.answeredOn IS NOT NULL')
          .andWhere('question.answeredOn >= :time', {time: dateFormat(new Date(time), 'yyyy-mm-dd HH:MM:ss')})
          .orderBy('question.answeredOn')
          .getRawMany();
      }
      if (sessionId && userId) {
        return await this.askedQuestionRepository
          .createQueryBuilder('question')
          .select([
            'question.contestContenderId',
            'question.score',
            'question.answeredOn',
          ])
          .addSelect(subQuery => {
            return subQuery
              .select('user.email', 'email')
              .from(User, 'user')
              .where('user.id = question.contestContenderId');
          }, 'user')
          .where('question.sessionId = :sessionId', { sessionId })
          .andWhere('question.contestContenderId = :userId', { userId })
          .andWhere('question.answeredOn IS NOT NULL')
          .orderBy('question.answeredOn')
          .getRawMany();
      }
      if (sessionId) {
        return await this.askedQuestionRepository
          .createQueryBuilder('question')
          .select([
            'question.contestContenderId',
            'question.score',
            'question.answeredOn',
          ])
          .addSelect(subQuery => {
            return subQuery
              .select('user.email', 'email')
              .from(User, 'user')
              .where('user.id = question.contestContenderId');
          }, 'user')
          .where('question.sessionId = :sessionId', { sessionId })
          .andWhere('question.answeredOn IS NOT NULL')
          .orderBy('question.answeredOn')
          .getRawMany();
      }
      return await this.askedQuestionRepository
        .createQueryBuilder('question')
        .select([
          'question.contestContenderId',
          'question.score',
          'question.answeredOn',
        ])
        .addSelect(subQuery => {
          return subQuery
            .select('user.email', 'email')
            .from(User, 'user')
            .where('user.id = question.contestContenderId');
        }, 'user')
        .where('question.answeredOn IS NOT NULL')
        .orderBy('question.answeredOn')
        .getRawMany();
    } catch (err) {
      return err;
    }
  }
}
