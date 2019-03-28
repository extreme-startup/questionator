import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ContestMigration1552215372032 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'contest',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'isDeleted',
            type: 'boolean',
          },
          {
            name: 'ownerId',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('contest');
  }
}
