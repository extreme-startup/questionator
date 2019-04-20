import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultValueForContestIsDeleted1555748182136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `contest` CHANGE `isDeleted` `isDeleted` tinyint NOT NULL");
    }

}
