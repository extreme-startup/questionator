import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';

import { Contest } from '../../entity/Contest';
import { IContestDto } from './contest.interface';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
  ) {}

  async findOne(id: number): Promise<Contest> {
    return await this.contestRepository.findOne(id);
  }

  async findAll(): Promise<Contest[]> {
    return await this.contestRepository.find();
  }

  async create(contest: IContestDto): Promise<InsertResult> {
    const newContest: Contest = this.contestRepository.create(contest);
    return await this.contestRepository.insert(newContest);
  }

  async update(id: number, contest: IContestDto): Promise<UpdateResult> {
    return await this.contestRepository.update(id, contest);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.contestRepository.delete(id);
  }

  async findAllQuestions(id: number): Promise<any> {
    return await this.contestRepository.find({
      relations: ['questions'],
      where: { id },
    });
  }
}
