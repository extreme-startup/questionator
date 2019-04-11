import { Test, TestingModule } from '@nestjs/testing';
import { ManageSessionController } from './manage-session.controller';

describe('ManageSession Controller', () => {
  let controller: ManageSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageSessionController],
    }).compile();

    controller = module.get<ManageSessionController>(ManageSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
