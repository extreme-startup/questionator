import {MigrationInterface, QueryRunner} from "typeorm";

export class Contest1555619754025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`");
        await queryRunner.query("ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY `FK_d8c080e031a7df83f3d5ceb668b`");
        await queryRunner.query("ALTER TABLE `manage_session` ADD CONSTRAINT `FK_d8c080e031a7df83f3d5ceb668b` FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
