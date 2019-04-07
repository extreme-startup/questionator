import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'asked_questions' })
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

  @Column('uuid', {
    name: 'session_id',
    nullable: false,
  })
  sessionId: string;

  @Column('varchar', {
    name: 'generated_question',
    nullable: false,
  })
  generatedQuestion: string;

  @Column('varchar', {
    name: 'generated_answer',
    nullable: false,
  })
  generatedAnswer: string;

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

  @Column('varchar', {
    name: 'answer',
    nullable: true,
  })
  answer: string;

  @Column('numeric', {
    name: 'score',
    nullable: false,
  })
  score: number;

  @Column('boolean', {
    name: 'is_correct',
    nullable: false,
    default: false,
  })
  isCorrect: boolean;
}
