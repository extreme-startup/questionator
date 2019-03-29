import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class UserMigration1553110549449 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }

}
