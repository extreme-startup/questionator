import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { ConfigModule } from '../../config';
import { PlayersController } from './controllers/players.controller';
import { PlayersService } from './services/players.service';
import { NotificationService } from './services/notification.service';
import { RoundController } from './controllers/round.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game';
import { Player } from './entities/player';
import { Round, RoundStep } from './entities/round';
import { RoundService } from './services/round.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Game, Player, Round, RoundStep]),
  ],
  controllers: [GameController, PlayersController, RoundController],
  providers: [GameService, PlayersService, NotificationService, RoundService],
})
export class GameModule {}
