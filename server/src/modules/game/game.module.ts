import { HttpModule, Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './services/game.service';
import { LocalTunnelService } from './services/local-tunnel.service';
import { ConfigModule } from '../../config';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [GameController],
  providers: [GameService, LocalTunnelService],
})
export class GameModule {}
