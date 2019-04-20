import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { ContestSession } from './ContestSession';
import { AskedQuestion } from './AskedQuestion';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public url: string;

  @Column('varchar')
  public nickname: string;

  @ManyToOne(type => User, (user: User) => user.players)
  @JoinColumn()
  public user: User;

  @ManyToOne(
    type => ContestSession,
    (contestSession: ContestSession) => contestSession.players,
  )
  @JoinTable()
  public contestSession: ContestSession;

  @OneToMany(
    type => AskedQuestion,
    (askedQuestion: AskedQuestion) => askedQuestion.player,
  )
  @JoinColumn()
  public askedQuestions: AskedQuestion[];
}
