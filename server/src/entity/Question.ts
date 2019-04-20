import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Round } from './Round';
import { AskedQuestion } from './AskedQuestion';

enum QuestionType {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
}

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid') public id: string;

  @Column('enum', {
    enum: QuestionType,
    default: QuestionType.STATIC,
    nullable: false,
  })
  public type: QuestionType;

  @Column('varchar', {
    nullable: false,
  })
  public text: string;

  @Column('varchar', {
    nullable: false,
  })
  public answer: string;

  @Column('integer', {
    nullable: false,
    default: 0,
  })
  public value: number;

  @Column('boolean', {
    default: false,
  })
  public deleted: boolean;

  @ManyToMany(type => Round, (round: Round) => round.id)
  @JoinTable({
    name: 'questions_rounds',
  })
  public rounds: Round[];

  @OneToMany(
    type => AskedQuestion,
    (askedQuestion: AskedQuestion) => askedQuestion.question,
  )
  @JoinColumn()
  public askedQuestions: AskedQuestion[];
}
