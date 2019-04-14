import { Injectable } from '@nestjs/common';
import { Player } from '../entities/player';
import { Game } from '../entities/game';
import { getGameByUniqueName } from '../helpers/game.helper';

// tslint:disable:no-console

// ToDo: Implement repository for game entity later if need.
// ToDo: Or leave in memory storage
@Injectable()
export class PlayersRepository {
  public register(player: Player): Player {
    const game: Game = getGameByUniqueName(player.gameName);

    if (!game) {
      throw new Error('game was not found');
    }

    game.players.push(player);

    // ToDo: call repository if need any storage
    console.log('Registered player: ', game, player);

    return player;
  }
}
