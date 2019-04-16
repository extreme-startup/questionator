import { Question } from '../../../entities/Question';
import { Round } from '../entities/round';

export interface RoundCreateRequestDto {
  round: number;
  gameId: string;
  includePreviousRound: boolean;
  startingQuestions: Question[]; // ToDo: Check for starting questions payload
  roundQuestions: Question[];
  min: number;
  max: number;
}

export interface RoundUpdateRequestDto {
  id: number;
}

// tslint:disable-next-line:no-empty-interface
export interface RoundListResponseDto extends Round {}
