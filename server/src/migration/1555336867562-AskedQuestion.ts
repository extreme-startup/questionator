import {MigrationInterface, QueryRunner} from 'typeorm';

export class AskedQuestion1555336867562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `generated_question` `question` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` DROP COLUMN `generated_answer`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `question` `generated_question` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `asked_question` ADD `generated_answer` varchar(255) NOT NULL");
    }

}
