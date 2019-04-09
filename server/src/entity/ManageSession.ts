import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  startedTime: Date;

  @OneToOne(type => User)
  @JoinColumn()
  trainer;

  @OneToMany(type => User, user => user.id)
  members: User[];
}
