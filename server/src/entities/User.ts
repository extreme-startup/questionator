import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManageSessionEntity } from './ManageSessionEntity';

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

  @ApiModelProperty()
  @OneToMany(type => ManageSessionEntity, session => session.trainer)
  sessions: ManageSessionEntity[];
}
