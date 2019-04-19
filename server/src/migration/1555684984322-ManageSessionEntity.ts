import {MigrationInterface, QueryRunner} from "typeorm";

export class ManageSessionEntity1555684984322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `manage_session_members_users` (`manageSessionId` int NOT NULL, `usersId` varchar(255) NOT NULL, INDEX `IDX_441a6bff4cc437f299529734f3` (`manageSessionId`), INDEX `IDX_e38aac74f6510c9f6ce417f0be` (`usersId`), PRIMARY KEY (`manageSessionId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `manage_session` ADD `sessionHash` text NOT NULL");
        await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `score` `score` decimal NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `manage_session_members_users` ADD CONSTRAINT `FK_441a6bff4cc437f299529734f37` FOREIGN KEY (`manageSessionId`) REFERENCES `manage_session`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `manage_session_members_users` ADD CONSTRAINT `FK_e38aac74f6510c9f6ce417f0be9` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `manage_session_members_users` DROP FOREIGN KEY `FK_e38aac74f6510c9f6ce417f0be9`");
        await queryRunner.query("ALTER TABLE `manage_session_members_users` DROP FOREIGN KEY `FK_441a6bff4cc437f299529734f37`");
        await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `score` `score` decimal NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `manage_session` DROP COLUMN `sessionHash`");
        await queryRunner.query("DROP INDEX `IDX_e38aac74f6510c9f6ce417f0be` ON `manage_session_members_users`");
        await queryRunner.query("DROP INDEX `IDX_441a6bff4cc437f299529734f3` ON `manage_session_members_users`");
        await queryRunner.query("DROP TABLE `manage_session_members_users`");
    }

}
