import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveContestOwner1555749038869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` DROP COLUMN `ownerId`");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` ADD `ownerId` varchar(255) NOT NULL");
    }

}
