import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Contest {
  @PrimaryColumn('integer', {
    generated: true,
  })
  id: number;

  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column('varchar')
  category: string;

  @Column('boolean')
  isDeleted: boolean;

  @Column('integer')
  ownerId: number;
}
