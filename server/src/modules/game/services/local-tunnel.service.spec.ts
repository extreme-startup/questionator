import { Test, TestingModule } from '@nestjs/testing';
import { LocalTunnelService } from './local-tunnel.service';

describe('LocalTunnelService', () => {
  let service: LocalTunnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalTunnelService],
    }).compile();

    service = module.get<LocalTunnelService>(LocalTunnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
