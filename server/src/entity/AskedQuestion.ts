import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity({ name: 'asked_question' })
export class AskedQuestion {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', {
    name: 'contest_contender_id',
    nullable: false,
  })
  contestContenderId: string;

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
    default: null,
  })
  answeredOn: Date;

  @Column('varchar', {
    name: 'answer',
    nullable: true,
    default: '',
  })
  answer: string;

  @Column('numeric', {
    name: 'score',
    nullable: false,
  })
  score: number;
}