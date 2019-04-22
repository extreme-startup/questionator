import { ApiModelProperty } from '@nestjs/swagger';

export class ContestDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;
}
