import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'asked_question' })
export class AskedQuestion {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('integer', {
    name: 'contest_contender_id',
    nullable: false,
  })
  contestContenderId: number;

  @Column('uuid', {
    name: 'question_id',
    nullable: false,
  })
  questionId: string;

  @Column('varchar', {
    name: 'question',
    nullable: false,
  })
  question: string;

  @Column('varchar', {
    name: 'answer',
    nullable: false,
  })
  answer: string;

  @Column('datetime', {
    name: 'asked_on',
    nullable: false,
  })
  askedOn: Date;

  @Column('datetime', {
    name: 'answered_on',
    nullable: true,
  })
  answeredOn: Date;

  @Column('numeric', {
    name: 'score',
    nullable: false,
    default: 0,
  })
  score: number;

  @Column('boolean', {
    name: 'is_correct',
    nullable: false,
    default: false,
  })
  isCorrect: boolean;
}
