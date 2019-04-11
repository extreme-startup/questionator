import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';
import { SessionStatus } from '../modules/manage-session/ManageSession.dto';

@Entity('manage_session')
export class ManageSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: SessionStatus;

  @Column('timestamp', {
    nullable: true,
  })
  startedTime: string;

  @ManyToOne(type => User, user => user.sessions)
  trainer: User;
}
