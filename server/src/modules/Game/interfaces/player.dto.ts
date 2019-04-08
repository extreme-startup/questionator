import { Player } from '../entity/player';

export interface PlayerRequestDto {
  team: string;
  host: string;
  gameName: string;
}

// tslint:disable-next-line:no-empty-interface
export interface PlayerResponseDto extends Player {}
