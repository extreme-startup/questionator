import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AskedQuestion1554142210463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'asked_question',
        columns: [
          {
            type: 'uuid',
            name: 'id',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'contest_contender_id',
            type: 'uuid',
          },
          { type: 'datetime', name: 'asked_on' },
          { type: 'datetime', name: 'answered_on', default: null },
          { type: 'uuid', name: 'question_id' },
          { type: 'varchar', name: 'generated_answer' },
          { type: 'varchar', name: 'generated_question' },
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
