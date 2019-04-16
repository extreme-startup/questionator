import { Test, TestingModule } from '@nestjs/testing';
import { RoundController } from './round.controller';

describe('Round Controller', () => {
  let controller: RoundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundController],
    }).compile();

    controller = module.get<RoundController>(RoundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
