import { ApiModelProperty } from '@nestjs/swagger';
import { QuestionType } from '../../../constants';

export class QuestionCreateDto {
    @ApiModelProperty()
    public readonly contestId: string;

    @ApiModelProperty()
    public readonly type: QuestionType;

    @ApiModelProperty()
    public readonly text: string;

    @ApiModelProperty()
    public readonly answer: string;

    @ApiModelProperty()
    public readonly value: number;
}
