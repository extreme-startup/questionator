import { MigrationInterface, QueryRunner } from 'typeorm';

export class StaticQuestionsSetup1555080522980 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `asked_question` DROP COLUMN `contest_contender_id`');
    await queryRunner.query('ALTER TABLE `asked_question` ADD `contest_contender_id` int NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `asked_question` DROP COLUMN `contest_contender_id`');
    await queryRunner.query('ALTER TABLE `asked_question` ADD `contest_contender_id` varchar(255) NOT NULL');
  }

}
