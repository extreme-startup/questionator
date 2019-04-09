import * as uuid from 'uuid';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../../entity/Session';
import { QuestionService } from '../Question/question.service';
import { ContenderGateway } from '../Contender/contender.gateway';

// TODO: move this to some external constants module
// TODO: mabe make this configurable
const SESSION_EXPIRATION_TIME_MS = 1728000;

@Injectable()
export class SessionService {
  private sessionId: string;

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly questionService: QuestionService,
    private readonly contenderGatevay: ContenderGateway,
  ) {}

  public async registerSession() {
    const session = {
      id: uuid(),
      expiresAt: SESSION_EXPIRATION_TIME_MS, // should it be time till expiration?
      data: 'PLACEHOLDER', // what exactly goes here?
    };
    return await this.sessionRepository.insert(session);
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find();
  }

  async validateSession(sessionId: string): Promise<any> {
    const session = await this.sessionRepository.findOne({ id: sessionId });
    return session ? true : false;
  }
}
