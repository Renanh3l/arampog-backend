import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUsersMVPColumns1642309117995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "nickname",
        type: "varchar",
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: "mmr",
        type: "float8",
        default: 0,
      }),
      new TableColumn({
        name: "inQueue",
        type: "boolean",
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("users", ["inQueue", "mmr", "nickname"]);
  }
}
