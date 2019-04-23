import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';

import { Contest } from '../../entity/Contest';
import { ContestDto } from './contest.dto';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
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
    return await this.contestRepository.save(newContest);
  }

  async update(id: string, contest: ContestDto): Promise<UpdateResult> {
    return await this.contestRepository.update(id, contest);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.contestRepository.delete(id);
  }

  async findAllQuestions(id: string): Promise<any> {

    const contest = await this.contestRepository.findOne({
      relations: ['questions'],
      where: { id },
    });

    // TODO: FIX ME
    // return contest.questions.filter((question) => !question.isDeleted);
  }
}
