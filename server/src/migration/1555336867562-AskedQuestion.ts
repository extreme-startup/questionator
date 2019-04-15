import {MigrationInterface, QueryRunner} from 'typeorm';

export class AskedQuestion1555336867562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "generated_question" RENAME TO "question"`);
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "generated_answer" RENAME TO "answer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "question" RENAME TO "generated_question"`);
        await queryRunner.query(`ALTER TABLE "asked_question" ALTER COLUMN "answer" RENAME TO "generated_answer"`);
    }

}
