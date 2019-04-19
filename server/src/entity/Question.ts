import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Contest } from './Contest';

enum QuestionType {
    STATIC = 'static',
    DYNAMIC = 'dynamic',
}

@Entity({name: 'questions'})
export class Question {
    @PrimaryGeneratedColumn('uuid', { name: 'id' }) id: string;

    @Column('enum', {
        name: 'type',
        enum: QuestionType,
        default: QuestionType.STATIC,
        nullable: false,
    })
    type: QuestionType;

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
        name: 'contextGenerator',
        nullable: true,
    })
    contextGenerator: string;

    @Column('varchar', {
        name: 'answer_check',
        nullable: true,
    })
    answerCheck: string;

    @Column('varchar', {
        name: 'value',
        nullable: false,
    })
    value: number;

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
