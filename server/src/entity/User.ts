import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity({name: 'users'})
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @ApiModelProperty()
  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;
}
