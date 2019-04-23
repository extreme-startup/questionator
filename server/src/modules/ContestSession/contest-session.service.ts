import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestSession } from '../../entity/ContestSession';
import { ContestSessionDto, Status } from './contest-session.dto';
import { Player } from '../../entity/Player';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(query): Promise<ContestSessionDto[]> {
    try {
      return this.msRepository.find({ where: { ...query }, relations: ['players', 'contests'] });
    } catch (e) {
      return e;
    }
  }

  async findById(id: number): Promise<ContestSessionDto> {
    try {
      return this.msRepository.findOne(id, { relations: ['players'] });
    } catch (e) {
      return e;
    }
  }

  async create(data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    const session = new ContestSession();

    session.contests = data.contests;

    return this.msRepository.save(session);
  }

  async addPlayer(body: { sessionId: string, playerId: string }) {
    try {
      const player = await this.playerRepository.findOne(body.playerId);
      const session = await this.msRepository.findOne(body.sessionId);

      session.players.push(player);

      return this.msRepository.save(session);
    } catch (e) {
      return e;
    }
  }

  async update(id: number, data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    await this.msRepository.update(id, data);
    return this.msRepository.findOne(id);
  }
}
