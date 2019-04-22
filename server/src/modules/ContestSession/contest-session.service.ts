import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContestSession } from '../../entity/ContestSession';
import { ContestSessionDto, Status } from './contest-session.dto';

@Injectable()
export class ContestSessionService {
  constructor(
    @InjectRepository(ContestSession)
    private msRepository: Repository<ContestSession>,
  ) {}

  async findAll(): Promise<ContestSessionDto[]> {
    try {
      return this.msRepository.find();
    } catch (e) {
      return e;
    }
  }

  async findById(id: number): Promise<ContestSessionDto> {
    try {
      return this.msRepository.findOne(id);
    } catch (e) {
      return e;
    }
  }

  async create(data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    const session = new ContestSession();
    session.status = Status.CREATED;

    return this.msRepository.save(session);
  }

  async update(id: number, data: Partial<ContestSessionDto>): Promise<ContestSessionDto> {
    await this.msRepository.update(id, data);
    return this.msRepository.findOne(id);
  }
}
