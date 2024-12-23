import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeMoneyInMainCharacters1734914151774 implements MigrationInterface {
    name = 'ChangeMoneyInMainCharacters1734914151774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main_characters" RENAME COLUMN "ts" TO "tc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main_characters" RENAME COLUMN "tc" TO "ts"`);
    }

}
