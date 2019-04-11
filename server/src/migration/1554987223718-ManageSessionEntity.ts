import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManageSessionEntity1554987223718 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `manage_session` (`id` int NOT NULL AUTO_INCREMENT, `status` text NOT NULL, `startedTime` timestamp NULL, `trainerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NULL');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `customer` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `customer` DROP COLUMN `id`');
    await queryRunner.query('ALTER TABLE `customer` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT');
    await queryRunner.query('ALTER TABLE `qms_question` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`');
    await queryRunner.query('ALTER TABLE `qms_question` CHANGE `isDeleted` `isDeleted` tinyint(1) NOT NULL DEFAULT \'0\'');
    await queryRunner.query('ALTER TABLE `customer` DROP COLUMN `id`');
    await queryRunner.query('ALTER TABLE `customer` ADD `id` int NOT NULL');
    await queryRunner.query('ALTER TABLE `customer` ADD PRIMARY KEY (`id`)');
    await queryRunner.query('ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint(1) NOT NULL');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint(1) NOT NULL DEFAULT \'0\'');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NOT NULL');
    await queryRunner.query('DROP TABLE `manage_session`');
  }

}
