import { ApiModelProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @ApiModelProperty()
  email: string;
}
