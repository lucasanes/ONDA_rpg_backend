import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecoveryTable1733088392542 implements MigrationInterface {
    name = 'AddRecoveryTable1733088392542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recoveries" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9fdd487bb731364f115e892f1bb" UNIQUE ("user_id"), CONSTRAINT "PK_7f7fdc38ebfdfdaa075d0ae0a1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea1d77fecee727f93706c8cb4d" ON "recoveries" ("code") `);
        await queryRunner.query(`ALTER TABLE "recoveries" ADD CONSTRAINT "FK_9fdd487bb731364f115e892f1bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recoveries" DROP CONSTRAINT "FK_9fdd487bb731364f115e892f1bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea1d77fecee727f93706c8cb4d"`);
        await queryRunner.query(`DROP TABLE "recoveries"`);
    }

}
