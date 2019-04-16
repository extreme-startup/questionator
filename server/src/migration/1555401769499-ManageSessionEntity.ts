import {MigrationInterface, QueryRunner} from "typeorm";

export class ManageSessionEntity1555401769499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `customer` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `customer` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `asked_question` ADD CONSTRAINT `FK_3c1d47755a5d85a2ab5d3f3cf3b` FOREIGN KEY (`sessionId`) REFERENCES `manage_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `questions` ADD CONSTRAINT `FK_22cc6850fff9de7a0fa94b50e41` FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY `FK_22cc6850fff9de7a0fa94b50e41`");
        await queryRunner.query("ALTER TABLE `asked_question` DROP FOREIGN KEY `FK_3c1d47755a5d85a2ab5d3f3cf3b`");
        await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`");
        await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`");
        await queryRunner.query("ALTER TABLE `customer` ADD `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `customer` ADD PRIMARY KEY (`id`)");
    }

}
