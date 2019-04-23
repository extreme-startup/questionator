import { ApiModelProperty } from '@nestjs/swagger';

// tslint:disable:max-classes-per-file
export class ContestRequestDto {
  @ApiModelProperty()
  public name: string;

  @ApiModelProperty()
  public description: string;
}

export class ContestDto {
  @ApiModelProperty()
  public name: string;

  @ApiModelProperty()
  public description: string;
}
