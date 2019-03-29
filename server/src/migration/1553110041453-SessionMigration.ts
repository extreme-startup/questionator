import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class SessionMigration1553110041453 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'expiresAt',
            type: 'integer',
          },
          {
            name: 'data',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('sessions');
  }

}
