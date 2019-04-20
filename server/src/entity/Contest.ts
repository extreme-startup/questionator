import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Question } from './Question';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Contest {
  @ApiModelProperty()
  @PrimaryColumn('integer', {
    generated: true,
  })
  id: number;

  @ApiModelProperty()
  @Column('varchar')
  name: string;

  @ApiModelProperty()
  @Column('text')
  description: string;

  @ApiModelProperty()
  @Column('boolean', {
    name: 'isDeleted',
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => Question, question => question.contest)
    questions: Question[];
}
