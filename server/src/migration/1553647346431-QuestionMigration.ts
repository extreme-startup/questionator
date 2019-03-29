import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Question1553647346431 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
          new Table({
            name: 'qms_question',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
              },
              {
                name: 'type',
                type: 'varchar',
              },
              {
                name: 'text',
                type: 'varchar',
              },
              {
                name: 'answer',
                type: 'varchar',
              },
              {
                name: 'value',
                type: 'varchar',
              },
              {
                name: 'isDeleted',
                type: 'boolean',
              },
            ],
          }),
          true,
        );
      }

      async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('qms_question');
      }

}
