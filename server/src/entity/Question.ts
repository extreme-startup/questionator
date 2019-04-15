import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Contest } from './Contest';

@Entity({name: 'questions'})
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

    @ManyToOne(() => Contest, contest => contest.questions)
    contest: Contest;

    @Column('integer', {
        name: 'contestId',
        default: false,
    })
    contestId: number;
}
