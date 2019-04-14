import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Contest {
  @ApiModelProperty()
  @PrimaryColumn('integer', {
    generated: true,
  })
  id: number;

  @ApiModelProperty()
  @Column('varchar')
  name: string;

  @ApiModelProperty()
  @Column('text')
  description: string;

  @ApiModelProperty()
  @Column('varchar')
  category: string;

  @ApiModelProperty()
  @Column('boolean')
  isDeleted: boolean;

  @ApiModelProperty()
  @Column('integer')
  ownerId: number;
}
