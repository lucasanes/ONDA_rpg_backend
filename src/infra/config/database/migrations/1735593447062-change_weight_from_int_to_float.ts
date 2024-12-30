import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeWeightFromIntToFloat1735593447062 implements MigrationInterface {
    name = 'ChangeWeightFromIntToFloat1735593447062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "items" ADD "weight" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "items" ADD "weight" integer NOT NULL DEFAULT '0'`);
    }

}
