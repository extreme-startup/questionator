import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManageSessionEntity } from './ManageSessionEntity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;

  @OneToMany(type => ManageSessionEntity, session => session.trainer)
  sessions: ManageSessionEntity[];
}
