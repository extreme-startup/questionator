import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';

import { Contest } from '../../entity/Contest';
import { ContestSession } from '../../entity/ContestSession';
import { RoundService } from '../ContestSession/round.service';
import { ContestDto } from './contest.dto';
import { Question } from 'src/entity/Question';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
    private readonly roundService: RoundService,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findOne(id: string): Promise<Contest> {
    return await this.contestRepository.findOne(id);
  }

  async findAll(): Promise<Contest[]> {
    const contests = await this.contestRepository.find();

    return contests.filter((contest) => !contest.isDeleted);
  }

  async create(contest: ContestDto): Promise<Contest> {
    const newContest: Contest = this.contestRepository.create(contest);
    const savedContest = await this.contestRepository.save(newContest);

    const round = await this.roundService.create({
      round: 1,
    });
    const session = new ContestSession();

    session.contest = newContest;
    session.rounds = [round.data];

    this.msRepository.save(session);
    return savedContest;
  }

  async update(id: string, contest: ContestDto): Promise<UpdateResult> {
    return await this.contestRepository.update(id, contest);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.contestRepository.delete(id);
  }

  async findAllQuestions(id: string): Promise<any> {

    const contest = await this.contestRepository.findOne({
      relations: ['contestSessions'],
      where: { id },
    });

    const contestSession = await this.msRepository.findOne({
      relations: ['rounds'],
      where: { id: contest.contestSessions[0].id },
    });

    const questions = await this.questionRepository.find({
      where: { roundId: contestSession.rounds[0].id },
    });

    return questions.filter((question) => !question.deleted);
  }
}
