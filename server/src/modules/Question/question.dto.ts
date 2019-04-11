import { ApiModelProperty } from '@nestjs/swagger';

export class QuestionDto {
    @ApiModelProperty()
    readonly type: string;

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly answer: string;

    @ApiModelProperty()
    readonly value: string;

    @ApiModelProperty()
    readonly isDeleted: boolean;
}
