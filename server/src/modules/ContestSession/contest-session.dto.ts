export enum Status {
  CREATED = 'created',
  IN_PROGRES = 'in progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ContestSessionDto {
  id: string;
  status: Status;
  startedTime: string;
  includePreviousRounds: boolean;
  activeRound: number;
  contests: any;
  rounds: any[];
  askedQuestions: any[];
  players: any[];
}
