import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

import { ManageSessionEntity } from '../../entity/ManageSessionEntity';
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
      return this.msRepository.find({  where: { trainer: userId }, relations: ['trainer', 'members'] });
    } catch (e) {
      return e;
    }
  }

  async findById(id: number, userId: string): Promise<ManageSessionDto> {
    try {
      return this.msRepository.findOne(id, { where: { trainer: userId },  relations: ['trainer', 'members'] });
    } catch (e) {
      return e;
    }
  }

  async create(data: Partial<ManageSessionDto>, metadata: { userId: string }): Promise<ManageSessionDto> {
    const trainer = await this.userRepository.findOne({ where: { id: metadata.userId } });
    const session = new ManageSessionEntity();

    session.status = SessionStatus.CREATED;
    session.trainer = trainer;
    session.sessionHash = uuid();

    return this.msRepository.save(session);
  }

  async update(id: number, data: Partial<ManageSessionDto>): Promise<ManageSessionDto> {
    await this.msRepository.update(id, data);
    return this.msRepository.findOne(id);
  }

  async addMembers(body: { sessionHash: string, userId: string }) {
    try {
      const user = await this.userRepository.findOne(body.userId);
      const session = await this.msRepository.findOne( { where: { link: body.sessionHash }, relations: ['trainer', 'members'] });
      session.members.push(user);

      return this.msRepository.save(session);
    } catch (e) {
      return e;
    }
  }
}
