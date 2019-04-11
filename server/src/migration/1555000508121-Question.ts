import {MigrationInterface, QueryRunner} from 'typeorm';

export class Question1555000508121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE IF NOT EXISTS `questions` (`id` varchar(36) NOT NULL, `type` varchar(255) NOT NULL, ' +
        '`text` varchar(255) NOT NULL, ' +
        '`answer` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, `contestId` int NOT NULL ' +
        'DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE `questions`');
    }

}
