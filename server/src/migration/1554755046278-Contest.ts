import {MigrationInterface, QueryRunner} from 'typeorm';

export class Contest1554755046278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `questions` (`id` varchar(36) NOT NULL, `type` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, ' +
        ' `answer` varchar(255) NOT NULL, ' +
        ' `value` varchar(255) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, `contestId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NULL');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `questions` ADD CONSTRAINT `FK_22cc6850fff9de7a0fa94b50e41` FOREIGN KEY (`contestId`) REFERENCES ' +
        '`contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `questions` DROP FOREIGN KEY `FK_22cc6850fff9de7a0fa94b50e41`');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint(1) NOT NULL DEFAULT \'0\'');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NOT NULL');
        await queryRunner.query('DROP TABLE `questions`');
    }

}
