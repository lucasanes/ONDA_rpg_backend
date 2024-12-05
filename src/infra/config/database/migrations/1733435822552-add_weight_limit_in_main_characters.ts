import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeightLimitInMainCharacters1733435822552 implements MigrationInterface {
    name = 'AddWeightLimitInMainCharacters1733435822552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main_characters" ADD "weight_limit" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "main_characters" DROP COLUMN "weight_limit"`);
    }

}
