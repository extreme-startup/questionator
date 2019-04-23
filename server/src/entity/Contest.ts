import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { ContestSession } from './ContestSession';

@Entity({ name: 'contests' })
export class Contest {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', {
    nullable: false,
  })
  public name: string;

  @Column('text', {
    nullable: true,
  })
  public description: string;

  @Column('boolean', {
    nullable: true,
    name: 'is_deleted',
  })
  public isDeleted: boolean;

  @Column('int', {
    nullable: false,
    default: 1,
    name: 'round_count',
  })
  public roundCount: number;

  @ManyToOne(type => User, (user: User) => user.contests)
  public trainer: User;

  @OneToMany(
    type => ContestSession,
    (contestSession: ContestSession) => contestSession.contest,
  )
  public contestSessions: ContestSession[];
}
