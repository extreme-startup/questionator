import { Game } from '../entities/game';
import { gamesStorage } from '../repository/storage-mock';

export const getGameByUniqueName = (name: string): Game => {
  return (
    gamesStorage && gamesStorage.filter((game: Game) => game.name === name)[0]
  );
};
