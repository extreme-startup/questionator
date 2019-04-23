import { QuestionDto } from '../Question/dto/question.dto';
import { ApiModelProperty } from '@nestjs/swagger';

// tslint:disable:max-classes-per-file
export class RoundRequestDto {
  @ApiModelProperty()
  contestId: string;

  @ApiModelProperty()
  round: number;
}

export class RoundDto {
  @ApiModelProperty()
  round: number;

  @ApiModelProperty()
  questions: QuestionDto[];
}
