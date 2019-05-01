import { Repository } from 'typeorm';

import { PlayerService } from './player.service';
import { Player } from '../../entity/Player';

describe('PlayerService', () => {
  jest.mock('typeorm');

  let playerMockRepository: Repository<Player>;
  let service: PlayerService;

  beforeEach(async () => {
    playerMockRepository = new Repository();

    service = new PlayerService(playerMockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
