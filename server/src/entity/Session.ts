import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { SessionEntity } from 'typeorm-store';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({name: 'sessions'})
export class Session extends BaseEntity implements SessionEntity {
  @ApiModelProperty()
  @PrimaryColumn('varchar', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @ApiModelProperty()
  @Column('integer', {
    nullable: false,
    name: 'expiresAt',
  })
  expiresAt: number;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'data',
  })
  data: string;
}
