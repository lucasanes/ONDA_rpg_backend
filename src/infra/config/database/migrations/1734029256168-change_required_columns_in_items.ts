import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRequiredColumnsInItems1734029256168 implements MigrationInterface {
    name = 'ChangeRequiredColumnsInItems1734029256168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "image" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "image" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "items" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
