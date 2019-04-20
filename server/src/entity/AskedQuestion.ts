import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ContestSession } from './ContestSession';
import { Question } from './Question';
import { Player } from './Player';

@Entity({ name: 'asked_questions' })
export class AskedQuestion {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar', {
    nullable: false,
  })
  public text: string;

  @Column('varchar', {
    nullable: false,
  })
  public answer: string;

  @Column('datetime', {
    name: 'asked_on',
    nullable: false,
  })
  public askedOn: Date;

  @Column('datetime', {
    name: 'answered_on',
    nullable: true,
  })
  public answeredOn: Date;

  @Column('integer', {
    nullable: false,
    default: 0,
  })
  public score: number;

  @Column('boolean', {
    name: 'is_correct',
    nullable: false,
    default: false,
  })
  public isCorrect: boolean;

  @Column('varchar', {
    name: 'contest_contender_id',
    nullable: false,
  })
  contestPlayerId: string;

  @ManyToOne(
    type => ContestSession,
    (contestSession: ContestSession) => contestSession.askedQuestions,
  )
  @JoinColumn()
  public contestSession: ContestSession;

  @ManyToOne(type => Question, (question: Question) => question.askedQuestions)
  @JoinColumn()
  public question: Question;

  @ManyToOne(type => Player, (player: Player) => player.askedQuestions)
  @JoinColumn()
  public player: Player;
}
