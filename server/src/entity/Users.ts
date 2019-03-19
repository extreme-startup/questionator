import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;
}
