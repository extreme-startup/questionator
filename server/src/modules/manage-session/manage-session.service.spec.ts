import { Test, TestingModule } from '@nestjs/testing';
import { ManageSessionService } from './manage-session.service';

describe('ManageSessionService', () => {
  let service: ManageSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageSessionService],
    }).compile();

    service = module.get<ManageSessionService>(ManageSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
