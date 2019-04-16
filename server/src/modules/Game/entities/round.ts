import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Session } from '../../../entities/Session';
import { Game } from './game';
import { Question } from 'src/entities/Question';

@Entity({ name: 'round_steps' })
export class RoundStep {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public count: number; // number of questions

  @Column()
  public complexity: number;

  // ToDo: Add more fields to payload
}

// tslint:disable-next-line:max-classes-per-file
@Entity({ name: 'rounds' })
export class Round {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public round: number;

  @Column()
  public includePreviousRound: boolean;

  @OneToOne(type => RoundStep, (step: RoundStep) => step.id)
  @JoinColumn()
  public step: RoundStep;

  @OneToMany(type => Question, (question: Question) => question.id)
  @JoinColumn()
  public questions: Question[];

  @ManyToOne(type => Game, (game: Game) => game.id)
  @JoinColumn()
  public game: Game;

  @ManyToOne(type => Session, (session: Session) => session.id)
  @JoinColumn()
  public session: Session;

  // ToDo: Add more fields to payload
}
