import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../entities/Session';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find();
  }

  async validateSession(sessionId): Promise<any> {
    const session = await this.sessionRepository.findOne({ id: sessionId });
    return session ? true : false;
  }

}
