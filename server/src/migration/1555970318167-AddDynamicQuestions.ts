import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDynamicQuestions1555970318167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `asked_question` ADD `context` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `questions` ADD `contextGenerator` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `asked_question` CHANGE `answer` `answer` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `questions` DROP COLUMN `contextGenerator`");
        await queryRunner.query("ALTER TABLE `asked_question` DROP COLUMN `context`");
    }

}
