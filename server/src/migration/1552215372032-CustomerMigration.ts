import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CustomerMigration1552215372032 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
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
    await queryRunner.dropTable('customer');
  }
}
