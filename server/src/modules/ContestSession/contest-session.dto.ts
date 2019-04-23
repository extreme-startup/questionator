export enum Status {
  CREATED = 'created',
  IN_PROGRESS = 'in progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ContestSessionDto {
  id: string;
  status: Status;
  startedTime: string;
  includePreviousRounds: boolean;
  activeRound: number;
  contest: any;
  rounds: any[];
  askedQuestions: any[];
  players: any[];
}
