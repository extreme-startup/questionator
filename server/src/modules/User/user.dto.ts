import { ManageSessionDto } from '../manage-session/ManageSession.dto';

export class UserDto {
  id: string;
  email: string;
  sessions: ManageSessionDto[];
}
