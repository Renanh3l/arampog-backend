import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveUnusedColumnsFromUsers1642466395368
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", ["email", "password"]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "email",
        type: "varchar",
        isUnique: true,
      }),
      new TableColumn({
        name: "password",
        type: "varchar",
      }),
    ]);
  }
}
