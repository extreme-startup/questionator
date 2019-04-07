import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AskedQuestion1554387790317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'asked_question',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'contest_contender_id',
            type: 'integer',
          },
          { name: 'asked_on', type: 'datetime' },
          { name: 'answered_on', type: 'datetime' },
          { name: 'question_id', type: 'varchar' },
          { name: 'generated_answer', type: 'varchar' },
          { name: 'generated_question', type: 'varchar' },
          { name: 'answer', type: 'varchar' },
          { name: 'score', type: 'numeric' },
          { name: 'is_correct', type: 'boolean', default: false },
        ],
      }),
      true,
    );

    await queryRunner.renameTable('asked_question', 'asked_questions');

    await queryRunner.addColumn(
      'asked_questions',
      new TableColumn({
        name: 'session_id',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('asked_questions', 'session_id');
    await queryRunner.dropTable('asked_questions');
  }
}
