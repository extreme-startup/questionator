import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { SessionStatus } from '../modules/manage-session/ManageSession.dto';
import { AskedQuestion } from './AskedQuestion';
import { Contest } from './Contest';
import { Player } from './Player';
import { Round } from './Round';

@Entity('contest_sessions')
export class ContestSession {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('varchar', {
    nullable: false,
    default: SessionStatus.CREATED,
  })
  public status: SessionStatus;

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
  @JoinColumn()
  public contests: Contest;

  @OneToMany(type => Round, (round: Round) => round.id)
  @JoinColumn()
  public rounds: Round[];

  @OneToMany(
    type => AskedQuestion,
    (askedQuestion: AskedQuestion) => askedQuestion.id,
  )
  @JoinColumn()
  public askedQuestions: AskedQuestion[];

  @OneToMany(type => Player, (player: Player) => player.contestSession)
  @JoinColumn()
  public players: Player[];
}
