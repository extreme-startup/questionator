import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
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

  @Column('uuid', {
    nullable: true,
    name: 'session_id',
  })
  sessionId: string;
}
