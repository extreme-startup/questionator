import { SessionStatus } from '../../entity/ManageSession';
import { UserDto } from '../User/user.dto';

export class ManageSessionDto {
  id: number;
  status: SessionStatus;
  trainer: UserDto;
  startedTime: string;
}
