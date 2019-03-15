import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn('integer', {
    generated: true,
    nullable: false,
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column('varchar', {
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column('varchar', {
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;
}
