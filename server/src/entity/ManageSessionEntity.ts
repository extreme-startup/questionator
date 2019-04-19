import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { User } from './User';
import { SessionStatus } from '../modules/manage-session/ManageSession.dto';
import { AskedQuestion } from './AskedQuestion';

@Entity('manage_session')
export class ManageSessionEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @Column('text')
  status: SessionStatus;

  @ApiModelProperty()
  @Column('timestamp', {
    nullable: true,
  })
  startedTime: string;

  @ApiModelProperty()
  @Column('text')
  sessionHash: string;

  @ApiModelProperty()
  @ManyToOne(type => User, user => user.sessions)
  trainer: User;

  @ApiModelProperty()
  @OneToMany(type => AskedQuestion, question => question.session)
  askedQuestion: AskedQuestion[];

  @ApiModelProperty()
  @ManyToMany(type => User, user => user.competitions)
  @JoinTable()
  members: User[];
}
