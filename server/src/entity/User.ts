import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Session } from './Session';
import { Player } from './Player';
import { Contest } from './Contest';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  public email: string;

  @OneToMany(type => Session, session => session.user)
  public sessions: Session[];

  @OneToMany(type => Player, (player: Player) => player.user)
  public players: Player[];

  @OneToMany(type => Contest, (contest: Contest) => contest.trainer)
  public contests: Contest[];
}
