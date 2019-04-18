import { ManageSessionRO } from '../manage-session/ManageSession.dto';

export class UserDto {
  id: string;
  email: string;
  sessions: ManageSessionRO[];
}
