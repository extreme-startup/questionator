import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1555772281522 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `sessions` (`id` varchar(255) NOT NULL, `expires_at` int NOT NULL, `claims` varchar(255) NOT NULL, `userId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `players` (`id` varchar(36) NOT NULL, `url` varchar(255) NOT NULL, `nickname` varchar(255) NOT NULL, `userId` varchar(255) NULL, `contestSessionId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `contests` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` text NULL, `is_deleted` tinyint NULL, `round_count` int NOT NULL DEFAULT 1, `trainerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `questions` (`id` varchar(36) NOT NULL, `type` enum ('static', 'dynamic') NOT NULL DEFAULT 'static', `text` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `value` int NOT NULL DEFAULT 0, `deleted` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rounds` (`id` varchar(36) NOT NULL, `round` int NOT NULL, `contestSessionId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `contest_sessions` (`id` varchar(36) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'created', `started_time` timestamp NULL, `include_previous_rounds` tinyint NOT NULL DEFAULT 1, `active_round` int NOT NULL DEFAULT 1, `contestsId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `asked_questions` (`id` varchar(36) NOT NULL, `text` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `asked_on` datetime NOT NULL, `answered_on` datetime NULL, `score` int NOT NULL DEFAULT 0, `is_correct` tinyint NOT NULL DEFAULT 0, `contest_contender_id` varchar(255) NOT NULL, `contestSessionId` varchar(255) NULL, `questionId` varchar(255) NULL, `playerId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `questions_rounds` (`questionsId` varchar(255) NOT NULL, `roundsId` varchar(255) NOT NULL, INDEX `IDX_f7d24b150340b93aaf7d0721a0` (`questionsId`), INDEX `IDX_01b48204b362820cf4ad75e6c9` (`roundsId`), PRIMARY KEY (`questionsId`, `roundsId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `sessions` ADD CONSTRAINT `FK_57de40bc620f456c7311aa3a1e6` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `players` ADD CONSTRAINT `FK_7c11c744c0601ab432cfa6ff7ad` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `players` ADD CONSTRAINT `FK_0b167a55ab53e1c4b146b5cbead` FOREIGN KEY (`contestSessionId`) REFERENCES `contest_sessions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contests` ADD CONSTRAINT `FK_7f6e4bbfc686abef51a2d9c977a` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rounds` ADD CONSTRAINT `FK_423a7bb7dab8c89adb98d022a39` FOREIGN KEY (`contestSessionId`) REFERENCES `contest_sessions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `contest_sessions` ADD CONSTRAINT `FK_28dc6d258c471b9e77a7d8aabd2` FOREIGN KEY (`contestsId`) REFERENCES `contests`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `asked_questions` ADD CONSTRAINT `FK_3cc73bbc0e19fc6a1bbdf0dd3a0` FOREIGN KEY (`contestSessionId`) REFERENCES `contest_sessions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `asked_questions` ADD CONSTRAINT `FK_5082177a1b918065a345cda2471` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `asked_questions` ADD CONSTRAINT `FK_9e4a8cb16ba02911ccca3d08252` FOREIGN KEY (`playerId`) REFERENCES `players`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `questions_rounds` ADD CONSTRAINT `FK_f7d24b150340b93aaf7d0721a01` FOREIGN KEY (`questionsId`) REFERENCES `questions`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `questions_rounds` ADD CONSTRAINT `FK_01b48204b362820cf4ad75e6c98` FOREIGN KEY (`roundsId`) REFERENCES `rounds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `questions_rounds` DROP FOREIGN KEY `FK_01b48204b362820cf4ad75e6c98`");
        await queryRunner.query("ALTER TABLE `questions_rounds` DROP FOREIGN KEY `FK_f7d24b150340b93aaf7d0721a01`");
        await queryRunner.query("ALTER TABLE `asked_questions` DROP FOREIGN KEY `FK_9e4a8cb16ba02911ccca3d08252`");
        await queryRunner.query("ALTER TABLE `asked_questions` DROP FOREIGN KEY `FK_5082177a1b918065a345cda2471`");
        await queryRunner.query("ALTER TABLE `asked_questions` DROP FOREIGN KEY `FK_3cc73bbc0e19fc6a1bbdf0dd3a0`");
        await queryRunner.query("ALTER TABLE `contest_sessions` DROP FOREIGN KEY `FK_28dc6d258c471b9e77a7d8aabd2`");
        await queryRunner.query("ALTER TABLE `rounds` DROP FOREIGN KEY `FK_423a7bb7dab8c89adb98d022a39`");
        await queryRunner.query("ALTER TABLE `contests` DROP FOREIGN KEY `FK_7f6e4bbfc686abef51a2d9c977a`");
        await queryRunner.query("ALTER TABLE `players` DROP FOREIGN KEY `FK_0b167a55ab53e1c4b146b5cbead`");
        await queryRunner.query("ALTER TABLE `players` DROP FOREIGN KEY `FK_7c11c744c0601ab432cfa6ff7ad`");
        await queryRunner.query("ALTER TABLE `sessions` DROP FOREIGN KEY `FK_57de40bc620f456c7311aa3a1e6`");
        await queryRunner.query("DROP INDEX `IDX_01b48204b362820cf4ad75e6c9` ON `questions_rounds`");
        await queryRunner.query("DROP INDEX `IDX_f7d24b150340b93aaf7d0721a0` ON `questions_rounds`");
        await queryRunner.query("DROP TABLE `questions_rounds`");
        await queryRunner.query("DROP TABLE `asked_questions`");
        await queryRunner.query("DROP TABLE `contest_sessions`");
        await queryRunner.query("DROP TABLE `rounds`");
        await queryRunner.query("DROP TABLE `questions`");
        await queryRunner.query("DROP TABLE `contests`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `players`");
        await queryRunner.query("DROP TABLE `sessions`");
    }

}
