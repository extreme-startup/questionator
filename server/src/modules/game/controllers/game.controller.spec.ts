import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from '../services/game.service';
import { ConfigService } from '../../../config';
import { GameRepository } from '../repository/game.repository';
import { NotificationService } from '../services/notification.service';

describe('Game Controller', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService, ConfigService, GameRepository, NotificationService],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
