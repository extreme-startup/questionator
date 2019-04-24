import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Round } from '../../entity/Round';
import { ContestSession } from '../../entity/ContestSession';
import { ContestSessionDto } from './contest-session.dto';
import { RoundService } from './round.service';
import { ResponseDto } from '../../models/response.dto';
import { PlayerDto } from '../Player/player.dto';
import { PlayerService } from '../Player/player.service';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    private readonly roundService: RoundService,
    private readonly playerService: PlayerService,
  ) {}

  async findAll(query): Promise<ContestSession[]> {
    try {
      return this.msRepository.find({
        order: {
          startedTime: 'ASC',
        },
        where: { ...query },
          relations: ['players', 'contest', 'rounds'],
        });
    } catch (e) {
      return e;
    }
  }

  async findById(id: number): Promise<ContestSession> {
    try {
      return this.msRepository.findOne(id, { relations: ['players'] });
    } catch (e) {
      return e;
    }
  }

  async create(data: Partial<ContestSessionDto>): Promise<ContestSession> {
    const round: ResponseDto<Round> = await this.roundService.create({
      round: 1,
    });
    const session = new ContestSession();

    session.contest = data.contest;
    session.rounds = [round.data];

    return this.msRepository.save(session);
  }

  async addPlayer(body: Partial<PlayerDto>) {
    try {
      await this.playerService.create(body);
      return {
        success: true,
      };
    } catch (e) {
      return e;
    }
  }

  async update(data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    await this.msRepository.update(data.id, data);
    return this.msRepository.findOne(data.id);
  }
}
