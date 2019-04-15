import {MigrationInterface, QueryRunner} from "typeorm";

export class ManageSessionEntity1555064588740 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `manage_session` (`id` int NOT NULL AUTO_INCREMENT, `status` text NOT NULL, `startedTime` timestamp NULL, `trainerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `asked_question` ADD `sessionId` int NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_22cc6850fff9de7a0fa94b50e41` FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_22cc6850fff9de7a0fa94b50e41`");
        await queryRunner.query("ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint(1) NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `is_correct` `is_correct` tinyint(1) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answered_on` `answered_on` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` DROP COLUMN `sessionId`");
        await queryRunner.query("DROP TABLE `manage_session`");
    }

}
