import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestSession } from '../../entity/ContestSession';
import { ContestSessionDto } from './contest-session.dto';
import { Player } from '../../entity/Player';
import { Round } from '../../entity/Round';
import { RoundService } from './round.service';
import { ResponseDto } from '../../models/response.dto';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private readonly roundService: RoundService,
  ) {}

  async findAll(query): Promise<ContestSession[]> {
    try {
      return this.msRepository.find({
        where: { ...query },
        relations: ['players', 'rounds'], // contests
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

  async addPlayer(body: { sessionId: string; playerId: string }) {
    try {
      const player = await this.playerRepository.findOne(body.playerId);
      const session = await this.msRepository.findOne(body.sessionId);

      session.players.push(player);

      return this.msRepository.save(session);
    } catch (e) {
      return e;
    }
  }

  async update(data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    await this.msRepository.update(data.id, data);
    return this.msRepository.findOne(data.id);
  }
}
