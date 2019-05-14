import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from '../../entity/Player';
import { PlayerDto } from './player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(data: Partial<PlayerDto>): Promise<Player> {
    const player = this.playerRepository.create(data);
    const playerData = await this.playerRepository.save(player);

    return this.playerRepository.findOne(playerData.id, {
      relations: ['user', 'contestSession'],
    });
  }

  async findAll(contestSessionId: string, answerOn: Date): Promise<Player[]> {
    try {
      return this.playerRepository
        .createQueryBuilder('player')
        .leftJoin('player.contestSession', 'contestSession')
        .leftJoinAndSelect('player.askedQuestions', 'askedQuestion')
        .where('player.contestSessionId = :contestSessionId', {
          contestSessionId,
        })
        .andWhere('askedQuestion.answeredOn IS NOT NULL')
        .andWhere('askedQuestion.answeredOn > :answerOn ', { answerOn })
        .select([
          'player.id',
          'player.nickname',
          'askedQuestion.id',
          'askedQuestion.answeredOn',
          'askedQuestion.score',
        ])
        .orderBy('askedQuestion.answeredOn', 'ASC')
        .getMany();
    } catch (e) {
      return e;
    }
  }
}
