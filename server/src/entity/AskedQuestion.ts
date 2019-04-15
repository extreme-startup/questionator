import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { ManageSessionEntity } from './ManageSessionEntity';

@Entity({ name: 'asked_question' })
export class AskedQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiModelProperty()
  @Column('integer', {
    name: 'contest_contender_id',
    nullable: false,
  })

  @ApiModelProperty()
  contestContenderId: number;

  @ApiModelProperty()
  @Column('uuid', {
    name: 'question_id',
    nullable: false,
  })
  questionId: string;

  @ApiModelProperty()
  @Column('varchar', {
    name: 'generated_question',
    nullable: false,
  })
  generatedQuestion: string;

  @ApiModelProperty()
  @Column('varchar', {
    name: 'generated_answer',
    nullable: false,
  })
  generatedAnswer: string;

  @ApiModelProperty()
  @Column('datetime', {
    name: 'asked_on',
    nullable: false,
  })
  askedOn: Date;

  @ApiModelProperty()
  @Column('datetime', {
    name: 'answered_on',
    nullable: true,
  })
  answeredOn: Date;

  @ApiModelProperty()
  @Column('varchar', {
    name: 'answer',
    nullable: true,
  })
  answer: string;

  @ApiModelProperty()
  @Column('numeric', {
    name: 'score',
    nullable: false,
  })
  score: number;

  @ApiModelProperty()
  @Column('boolean', {
    name: 'is_correct',
    nullable: false,
    default: false,
  })
  isCorrect: boolean;

  @ApiModelProperty()
  @ManyToOne(type => ManageSessionEntity, session => session.askedQuestion)
  session: ManageSessionEntity;
}
