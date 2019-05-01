import { UserDto } from '../Result/dto/user.dto';
import { ContestSessionDto } from '../ContestSession/contest-session.dto';
import { AskedQuestionDto } from '../Result/dto/askedQuestion.dto';

export class PlayerDto {
  id: string;
  url: string;
  nickname: string;
  user: UserDto;
  contestSession: ContestSessionDto;
  askedQuestions: AskedQuestionDto[];
}
