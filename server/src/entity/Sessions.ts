import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';
import {SessionEntity} from 'typeorm-store';

@Entity()
export class Sessions extends BaseEntity implements SessionEntity {
  @PrimaryColumn('varchar', {
    nullable: false,
    name: 'id',
  })
  id: string;

  @Column('integer', {
    nullable: false,
    name: 'expiresAt',
  })
  expiresAt: number;

  @Column('varchar', {
    nullable: false,
    name: 'data',
  })
  data: string;
}
