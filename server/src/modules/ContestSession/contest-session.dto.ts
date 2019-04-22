export enum Status {
  CREATED = 'created',
  IN_PROGRES = 'in progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ContestSessionDto {
  id: number;
  status: Status;
  startedTime: string;
}
