import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ManageSessionEntity } from './ManageSessionEntity';

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

  @ManyToOne(type => ManageSessionEntity, session => session.askedQuestion)
  session: ManageSessionEntity;
}
