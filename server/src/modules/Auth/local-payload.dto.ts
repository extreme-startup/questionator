import { ApiModelProperty } from '@nestjs/swagger';

export class LocalPayload {
  @ApiModelProperty()
  email: string;
}
