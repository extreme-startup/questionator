import { UserDto } from '../User/user.dto';

export enum SessionStatus {
  CREATED = 'created',
  IN_PROGRES = 'in progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ManageSessionDto {
  status: SessionStatus;
  trainer: UserDto;
  startedTime: string;
}