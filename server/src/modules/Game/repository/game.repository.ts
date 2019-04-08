import { Injectable } from '@nestjs/common';
import { getGameByUniqueName } from '../helpers/game.helper';
import { Game } from '../entity/game';
// ToDO: remove mock later
import { gamesStorage } from './storage-mock';

// tslint:disable:no-console

// ToDo: Implement repository for game entity later if need.
// ToDo: Or leave in memory storage
@Injectable()
export class GameRepository {
  public set game(game: Game) {
    gamesStorage.push(game);
  }

  public getList(): Game[] {
    console.log('List of games: ', gamesStorage);
    return gamesStorage;
  }

  public registerGame(game: Game): Game {
    gamesStorage.push(game);

    // ToDo: call repository if need any storage (fallback to local state for now)
    console.log('Game has been created: ', gamesStorage, game);

    return game;
  }

  public start(name: string): Game {
    const game: Game = getGameByUniqueName(name);

    // ToDo: call repository if need any storage
    console.log('Game started with name: ', game.name, gamesStorage);

    return this.toggleGameStatus(game, true);
  }

  public stop(name: string): Game {
    const game: Game = getGameByUniqueName(name);

    // ToDo: call repository if need any storage
    console.log('Game stopped with name: ', game.name, gamesStorage);

    return this.toggleGameStatus(game, false);
  }

  //   private getGameByUniqueName(name: string) {
  //     return (
  //       gamesStorage && gamesStorage.filter((game: Game) => game.name === name)[0]
  //     );
  //   }

  private toggleGameStatus(game: Game, status: boolean): Game {
    if (!game) {
      throw new Error('cannot start game, since it hasn`t exist yet');
    }

    game.status = status;

    return game;
  }
}
