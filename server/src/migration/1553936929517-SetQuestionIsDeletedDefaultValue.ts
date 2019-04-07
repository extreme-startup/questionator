import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetQuestionIsDeletedDefaultValue1553936929517
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('questions');
    const isDeletedColumn = table!.findColumnByName('isDeleted')!;

    const changedIsDeletedColumn = isDeletedColumn.clone();
    changedIsDeletedColumn.default = false;
    await queryRunner.changeColumn(
      table!,
      isDeletedColumn,
      changedIsDeletedColumn,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('questions');
    const isDeletedColumn = table!.findColumnByName('isDeleted')!;

    const changedIsDeletedColumn = isDeletedColumn.clone();
    delete changedIsDeletedColumn.default;
    await queryRunner.changeColumn(
      table!,
      isDeletedColumn,
      changedIsDeletedColumn,
    );
  }
}
