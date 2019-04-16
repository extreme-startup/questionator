import {MigrationInterface, QueryRunner} from "typeorm";

export class ManageSessionEntity1555401769499 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `customer` MODIFY id INT NOT NULL;");
    await queryRunner.query("ALTER TABLE `customer` DROP PRIMARY KEY");
    await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`");
    await queryRunner.query("ALTER TABLE `customer` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
    await queryRunner.query("ALTER TABLE `manage_session` ADD FOREIGN KEY (`trainerId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE `asked_question` ADD FOREIGN KEY (`sessionId`) REFERENCES `manage_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE `questions` ADD FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `questions` DROP FOREIGN KEY (`trainerId`)");
    await queryRunner.query("ALTER TABLE `asked_question` DROP FOREIGN KEY (`sessionId`)");
    await queryRunner.query("ALTER TABLE `manage_session` DROP FOREIGN KEY (`contestId`)");
    await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `id`");
    await queryRunner.query("ALTER TABLE `customer` ADD `id` int NOT NULL");
    await queryRunner.query("ALTER TABLE `customer` ADD PRIMARY KEY (`id`)");
  }

}