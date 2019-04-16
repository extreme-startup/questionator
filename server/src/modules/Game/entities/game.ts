import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Session } from '../../../entities/Session';
import { Player } from './player';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public status: boolean; // Whether game is active or not

  @ManyToMany(type => Player, (player: Player) => player.id)
  @JoinTable()
  public players: Player[];

  @OneToOne(type => Session, (session: Session) => session.id)
  @JoinColumn()
  public session: Session;

  // ToDo: Add more fields to payload
}
