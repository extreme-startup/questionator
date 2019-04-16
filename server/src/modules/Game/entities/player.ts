import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, Column, OneToOne } from 'typeorm';
import { Game } from './game';
import { Session } from '../../../entities/Session';
import { User } from '../../../entities/User';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public team: string;

  @Column()
  public score: number;

  @OneToOne(type => User, (user: User) => user.id)
  @JoinColumn()
  public user: User;

  @ManyToOne(type => Game, (game: Game) => game.id)
  @JoinColumn()
  public game: Game[];

  @ManyToMany(type => Session, (session: Session) => session.id)
  @JoinTable()
  public session: Session[];

  // ToDo: Add more fields to payload
}
