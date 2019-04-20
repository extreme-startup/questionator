// tslint:disable:max-classes-per-file

import { UserDto } from '../User/user.dto';
import { AskedQuestionDto } from '../Question/dto/askedQuestion.dto';

export enum SessionStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in progress',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

export class ManageSessionDto {
  id: number;
  startedTime: string;
  sessionHash: string;
  status: SessionStatus;
  trainer: UserDto;
  askedQuestion: AskedQuestionDto[];
  members: UserDto[];
}

export interface ManageSessionQueryList {
  status?: SessionStatus;
}
