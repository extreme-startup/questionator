import { Game } from '../entity/game';

export interface GameRequestDto {
  name: string;
}

// tslint:disable-next-line:no-empty-interface
export interface GameResponseDto extends Game {}
