import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @ApiModelProperty()
  @PrimaryColumn('integer', {
    generated: true,
    nullable: false,
    name: 'id',
  })
  id: number;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;
}
