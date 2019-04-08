import {MigrationInterface, QueryRunner} from 'typeorm';

export class Contest1554475296665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `question` DROP FOREIGN KEY `FK_35e182991778ff16a6f5f39ef69`');
        await queryRunner.query('ALTER TABLE `question` ADD CONSTRAINT `FK_3c8c9619a43e8eb82ac8513605c` ' +
        ' FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `question` DROP FOREIGN KEY `FK_3c8c9619a43e8eb82ac8513605c`');
        await queryRunner.query('ALTER TABLE `question` ADD CONSTRAINT `FK_35e182991778ff16a6f5f39ef69` ' +
        'FOREIGN KEY (`contestId`) REFERENCES `contest`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}
