import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { PlayersRepository } from '../repository/players.repository';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService, PlayersRepository],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
