import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionAndWeightInItems1733435724989 implements MigrationInterface {
    name = 'AddDescriptionAndWeightInItems1733435724989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "items" ADD "weight" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "description"`);
    }

}
