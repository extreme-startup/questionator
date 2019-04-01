import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AskedQuestion1554142210463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'qms_asked_question',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'contest_contender_id',
            type: 'string',
          },
          { type: 'datetime', name: 'asked_on' },
          { type: 'datetime', name: 'answered_on', default: null },
          { type: 'varchar', name: 'answer', default: '' },
          { type: 'numeric', name: 'score' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('qms_asked_question');
  }
}
