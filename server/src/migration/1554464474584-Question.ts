import {MigrationInterface, QueryRunner} from 'typeorm';

export class Question1554464474584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `question` ADD `contestId` int NULL');
        await queryRunner.query('ALTER TABLE `question` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL');
        await queryRunner.query('ALTER TABLE `customer` DROP PRIMARY KEY');
        await queryRunner.query('ALTER TABLE `customer` DROP COLUMN `id`');
        await queryRunner.query('ALTER TABLE `customer` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT');
        await queryRunner
        .query('ALTER TABLE `question` ADD CONSTRAINT `FK_35e182991778ff16a6f5f39ef69` ' +
        'FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `question` DROP FOREIGN KEY `FK_35e182991778ff16a6f5f39ef69`');
        await queryRunner.query('ALTER TABLE `customer` DROP COLUMN `id`');
        await queryRunner.query('ALTER TABLE `customer` ADD `id` int NOT NULL');
        await queryRunner.query('ALTER TABLE `customer` ADD PRIMARY KEY (`id`)');
        await queryRunner.query('ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint(1) NOT NULL');
        await queryRunner.query('ALTER TABLE `question` CHANGE `isDeleted` `isDeleted` ' +
        ' tinyint(1) NOT NULL DEFAULT "0"');
        await queryRunner.query('ALTER TABLE `question` DROP COLUMN `contestId`');
    }

}
