import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { LocalTunnelService } from './services/local-tunnel.service';
import { GameService } from './services/game.service';
import { ConfigService } from '../../config';

describe('Game Controller', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService, LocalTunnelService, ConfigService],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
