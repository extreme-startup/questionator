import { Game } from '../entities/game';

export interface GameRequestDto {
  name: string;
}

// tslint:disable-next-line:no-empty-interface
export interface GameResponseDto extends Game {}
