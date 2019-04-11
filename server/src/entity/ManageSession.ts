import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

export enum SessionStatus {
  LoV = 'LoV',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
}

@Entity('manage_session')
export class ManageSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: SessionStatus;

  @Column('timestamp')
  startedTime: string;

  @ManyToOne(type => User, user => user.sessions)
  trainer: User;
}
