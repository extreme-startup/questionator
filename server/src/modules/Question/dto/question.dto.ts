import { ApiModelProperty } from '@nestjs/swagger';
import { QuestionType } from '../../../constants';

export class QuestionDto {
  @ApiModelProperty()
  public readonly id: string;

  @ApiModelProperty()
  public readonly type: QuestionType;

  @ApiModelProperty()
  public readonly text: string;

  @ApiModelProperty()
  public readonly answer: string;

  @ApiModelProperty()
  readonly contextGenerator: string;

  //  @ApiModelProperty()
  // readonly answerCheck: string;

  @ApiModelProperty()
  public readonly value: number;

  @ApiModelProperty()
  public readonly isDeleted: boolean;
}
