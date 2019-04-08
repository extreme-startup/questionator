import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { GameRepository } from '../repository/game.repository';
import { NotificationService } from './notification.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, GameRepository, NotificationService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
