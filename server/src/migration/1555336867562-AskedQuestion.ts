import {MigrationInterface, QueryRunner} from 'typeorm';

export class AskedQuestion1555336867562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "generated_question" RENAME TO "question"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "generated_answer" RENAME TO "answer"`);
    }

}
