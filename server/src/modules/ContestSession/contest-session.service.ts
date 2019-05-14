import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Round } from '../../entity/Round';
import { ContestSession } from '../../entity/ContestSession';
import { ContestSessionDto, Status } from './contest-session.dto';
import { RoundService } from './round.service';
import { ResponseDto } from '../../models/response.dto';
import { PlayerDto } from '../Player/player.dto';
import { PlayerService } from '../Player/player.service';
import { AskQuestionsService } from '../AskQuestions/ask-questions.service';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    private readonly roundService: RoundService,
    private readonly playerService: PlayerService,
    private readonly askQuestionsService: AskQuestionsService,
  ) {}

  async findAll(query): Promise<ContestSession[]> {
    try {
      return this.msRepository.find({
        where: {
          ...query,
        },
        relations: ['players', 'rounds', 'contest', 'contest.trainer'],
      });
    } catch (e) {
      return e;
    }
  }

  async findById(id: string): Promise<ContestSession> {
    try {
      return this.msRepository.findOne(id, {
        relations: ['players', 'rounds', 'contest', 'contest.trainer'],
      });
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
      const player = await this.playerService.create(body);
      this.askQuestionsService.addAskQuestionJob(player);
      return {
        success: true,
      };
    } catch (e) {
      return e;
    }
  }

  async update(data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    await this.msRepository.update(data.id, data);
    switch (data.status) {
      case Status.COMPLETED: {
        this.askQuestionsService.stopAllSchedulers();
      }
      case Status.PAUSED: {
        this.askQuestionsService.pauseAllSchedulers();
      }
      case Status.IN_PROGRESS: {
        await this.askQuestionsService.startAllSchedulers();
      }
    }
    return this.msRepository.findOne(data.id);
  }
}
