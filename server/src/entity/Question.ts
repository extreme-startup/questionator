import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid', { name: 'id' }) id: string;

  @Column('varchar', {
    name: 'type',
    nullable: false,
  })
  type: string;

  @Column('varchar', {
    name: 'text',
    nullable: false,
  })
  text: string;

  @Column('varchar', {
    name: 'answer',
    nullable: false,
  })
  answer: string;

  @Column('varchar', {
    name: 'value',
    nullable: false,
  })
  value: string;

  @Column('boolean', {
    name: 'isDeleted',
    default: false,
  })
  isDeleted: boolean;
}
