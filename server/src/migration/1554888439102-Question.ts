import {MigrationInterface, QueryRunner} from 'typeorm';

export class Question1554888439102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `questions` ADD CONSTRAINT `FK_22cc6850fff9de7a0fa94b50e41` FOREIGN KEY ' +
        '(`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `questions` DROP FOREIGN KEY `FK_22cc6850fff9de7a0fa94b50e41`');
    }

}
