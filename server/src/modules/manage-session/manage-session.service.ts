import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ManageSessionEntity } from '../../entity/ManageSession';
import { ManageSessionDto } from './ManageSession.dto';

@Injectable()
export class ManageSessionService {
  constructor(
    @InjectRepository(ManageSessionEntity)
    private msRepository: Repository<ManageSessionEntity>,
  ) {}

  async findAll(): Promise<ManageSessionDto[]> {
    try {
      return this.msRepository.find();
    } catch (e) {
      return e;
    }
  }

  async findById(id: number): Promise<ManageSessionDto> {
    try {
      return this.msRepository.findOne(id);
    } catch (e) {
      return e;
    }
  }

  async create(session): Promise<ManageSessionDto> {
    return this.msRepository.save(session);
  }

  async update(id: number, session): Promise<ManageSessionDto> {
    await this.msRepository.update(id, session);
    return this.msRepository.findOne(id);
  }
}
