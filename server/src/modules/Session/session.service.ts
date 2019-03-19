import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sessions } from '../../entity/Sessions';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions)
    private readonly sessionRepository: Repository<Sessions>,
  ) {}

  async findAll(): Promise<Sessions[]> {
    return await this.sessionRepository.find();
  }

  async validateSession(sessionId): Promise<any> {
    const session = await this.sessionRepository.findOne({ id: sessionId });
    return session ? true : false;
  }

}
