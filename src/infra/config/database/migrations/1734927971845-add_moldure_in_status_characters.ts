import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMoldureInStatusCharacters1734927971845 implements MigrationInterface {
    name = 'AddMoldureInStatusCharacters1734927971845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_characters" ADD "moldure" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_characters" DROP COLUMN "moldure"`);
    }

}
