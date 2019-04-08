import { Player } from './player';

export interface Game {
  name: string;
  players: Player[];
  status: boolean;
  // ToDo: Add more fields to payload
}
