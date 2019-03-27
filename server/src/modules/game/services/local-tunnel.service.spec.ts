import { Test, TestingModule } from '@nestjs/testing';
import { LocalTunnelService } from './local-tunnel.service';
import { ConfigService } from '../../../config';

describe('LocalTunnelService', () => {
  let service: LocalTunnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalTunnelService, ConfigService],
    }).compile();

    service = module.get<LocalTunnelService>(LocalTunnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
