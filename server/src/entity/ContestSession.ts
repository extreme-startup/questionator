import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Status } from '../modules/ContestSession/contest-session.dto';
import { AskedQuestion } from './AskedQuestion';
import { Contest } from './Contest';
import { Player } from './Player';
import { Round } from './Round';

@Entity('contest_sessions')
export class ContestSession {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', {
    nullable: false,
    default: Status.CREATED,
  })
  public status: Status;

  @Column('timestamp', {
    nullable: true,
    name: 'started_time',
  })
  public startedTime: string;

  @Column('boolean', {
    nullable: false,
    default: true,
    name: 'include_previous_rounds',
  })
  public includePreviousRounds: boolean;

  @Column('int', {
    nullable: false,
    default: 1,
    name: 'active_round',
  })
  public activeRound: number;

  @ManyToOne(type => Contest, (contest: Contest) => contest.contestSessions)
  public contest: Contest;

  @OneToMany(type => Round, (round: Round) => round.contestSession)
  public rounds: Round[];

  @OneToMany(
    type => AskedQuestion,
    (askedQuestion: AskedQuestion) => askedQuestion.contestSession,
  )
  public askedQuestions: AskedQuestion[];

  @OneToMany(type => Player, (player: Player) => player.contestSession)
  public players: Player[];
}
