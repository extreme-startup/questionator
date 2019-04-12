import { UserDto } from '../User/user.dto';

export enum SessionStatus {
  LoV = 'LoV',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ManageSessionDto {
  status: SessionStatus;
  trainer: UserDto;
  startedTime: string;
}
