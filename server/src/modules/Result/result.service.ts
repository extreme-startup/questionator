import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Not, Equal } from 'typeorm';
import * as dateFormat from 'dateformat';
import { AskedQuestion } from '../../entity/AskedQuestion';

const MoreThanDate = (date: Date) => MoreThan(dateFormat(date, 'yyyy-mm-dd HH:MM:ss'));

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
  ) { }

  async getAllResults(sessionId?: string, time?: number, userId?: string): Promise<AskedQuestion[]> {
    try {
      if (sessionId && time) {
        return await this.askedQuestionRepository.find({
          where: {
            contestSession: sessionId,
            answeredOn: MoreThanDate(new Date(time)),
          },
          select: ['score', 'answeredOn', 'player'],
          relations: ['player', 'player.user'],
          order: {
            answeredOn: 'ASC',
          },
        });
      }
      if (sessionId && userId) {
        const res = await this.askedQuestionRepository.find({
          where: {
            contestSession: sessionId,
            answeredOn: Not(Equal(0)),
          },
          select: ['score', 'answeredOn', 'player'],
          relations: ['player', 'player.user'],
          order: {
            answeredOn: 'ASC',
          },
        });
        return res.filter(q => q.player.user.id === userId);
      }
      if (sessionId) {
        return await this.askedQuestionRepository.find({
          where: {
            contestSession: sessionId,
            answeredOn: Not(Equal(0)),
          },
          select: ['score', 'answeredOn', 'contestPlayerId'],
          order: {
            answeredOn: 'ASC',
          },
        });
      }
      return await this.askedQuestionRepository.find({
        where: { answeredOn: Not(Equal(0)) },
        select: ['score', 'answeredOn', 'player'],
        relations: ['player', 'player.user'],
        order: {
          answeredOn: 'ASC',
        },
      });
    } catch (err) {
      return err;
    }
  }
}
