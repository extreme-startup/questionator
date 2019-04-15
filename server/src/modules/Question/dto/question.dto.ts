import { ApiModelProperty } from '@nestjs/swagger';
import { QuestionType } from '../../../constants';

export class QuestionDto {
    @ApiModelProperty()
    readonly type: QuestionType;

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly answer: string;

    @ApiModelProperty()
    readonly value: number;

    @ApiModelProperty()
    readonly isDeleted: boolean;
}
