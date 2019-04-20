import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ManageSessionEntity } from '../../entity/ContestSession';
import { ManageSessionDto, SessionStatus } from './ManageSession.dto';
import { User } from '../../entity/User';

@Injectable()
export class ManageSessionService {
  constructor(
    @InjectRepository(ManageSessionEntity)
    private msRepository: Repository<ManageSessionEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(userId: string): Promise<ManageSessionDto[]> {
    try {
      return this.msRepository.find({  where: { trainer: userId }, relations: ['trainer'] });
    } catch (e) {
      return e;
    }
  }

  async findById(id: number): Promise<ManageSessionDto> {
    try {
      return this.msRepository.findOne(id, { relations: ['trainer'] });
    } catch (e) {
      return e;
    }
  }

  async create(data: Partial<ManageSessionDto>): Promise<ManageSessionDto> {
    const trainer = await this.userRepository.findOne({ where: { id: data.trainer } });
    const session = new ManageSessionEntity();
    session.status = SessionStatus.CREATED;
    session.trainer = trainer;

    return this.msRepository.save(session);
  }

  async update(id: number, data: Partial<ManageSessionDto>): Promise<ManageSessionDto> {
    await this.msRepository.update(id, data);
    return this.msRepository.findOne(id);
  }
}
