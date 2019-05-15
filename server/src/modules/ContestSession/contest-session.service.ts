import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Round } from '../../entity/Round';
import { ContestSession } from '../../entity/ContestSession';
import { Player } from '../../entity/Player';
import { ContestSessionDto, Status } from './contest-session.dto';
import { RoundService } from './round.service';
import { ResponseDto } from '../../models/response.dto';
import { PlayerDto } from '../Player/player.dto';
import { PlayerService } from '../Player/player.service';
import { AskQuestionsService } from '../AskQuestions/ask-questions.service';
import { AskedQuestion } from 'src/entity/AskedQuestion';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    @InjectRepository(AskedQuestion)
    private readonly askedQuestionRepository: Repository<AskedQuestion>,
    private readonly roundService: RoundService,
    private readonly playerService: PlayerService,
    private readonly askQuestionsService: AskQuestionsService,
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

  async findById(id: string): Promise<ContestSession> {
    try {
      return this.msRepository.findOne(id);
    } catch (e) {
      return e;
    }
  }

  async getResults(
    contestSessionId: string,
    answerOn: Date,
  ): Promise<Player[]> {
    try {
      return await this.playerService.findAll(contestSessionId, answerOn);
    } catch (e) {
      return e;
    }
  }

  async getLastAnswerOn(contestSessionId: string): Promise<Date> {
    try {
      return await this.askedQuestionRepository
        .createQueryBuilder('askedQuestion')
        .select('MAX(askedQuestion.answeredOn)', 'answeredOn')
        .where('askedQuestion.contestSession = :contestSessionId', {
          contestSessionId,
        })
        .getRawOne()
        .then(data => (data ? data.answeredOn : null));
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
