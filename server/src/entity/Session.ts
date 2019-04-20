import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SessionEntity } from 'typeorm-store';
import { User } from './User';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity implements SessionEntity {
  @PrimaryColumn('varchar', {
    nullable: false,
  })
  id: string;

  @Column('int', {
    nullable: false,
    name: 'expires_at',
  })
  public expiresAt: number;

  @Column('varchar', {
    nullable: false,
    name: 'claims',
  })
  public data: string;

  @ManyToOne(type => User, (user: User) => user.sessions)
  @JoinColumn()
  public user: User;
}
