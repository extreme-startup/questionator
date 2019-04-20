import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveContestCategory1555747855024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` DROP COLUMN `category`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` ADD `category` varchar(255) NOT NULL");
    }

}
