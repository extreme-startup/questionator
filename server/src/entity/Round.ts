import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Question } from './Question';
import { ContestSession } from './ContestSession';

@Entity({ name: 'rounds' })
export class Round {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('integer', {
    nullable: false,
  })
  public round: number;

  @ManyToOne(
    type => ContestSession,
    (contestSession: ContestSession) => contestSession.rounds,
  )
  public contestSession: ContestSession;

  @ManyToMany(type => Question, (question: Question) => question.rounds)
  @JoinTable({
    name: 'questions_rounds',
  })
  public questions: Question[];
}
