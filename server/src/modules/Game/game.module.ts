import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { ConfigModule } from '../../config';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { GameRepository } from './repository/game.repository';
import { PlayersRepository } from './repository/players.repository';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [ConfigModule],
  controllers: [GameController, PlayersController],
  providers: [
    GameRepository,
    PlayersRepository,
    GameService,
    PlayersService,
    NotificationService,
  ],
})
export class GameModule {}
