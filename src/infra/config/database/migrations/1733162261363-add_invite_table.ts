import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInviteTable1733162261363 implements MigrationInterface {
  name = 'AddInviteTable1733162261363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invites" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "session_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_188bacba32eb63b759f3578dd5" ON "invites" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_085d540d9f418cfbdc7bd55bb1" ON "sessions" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad71056f242dd581c44aa30e10" ON "items" ("session_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4843d2c18e60a0f40034a2361e" ON "items" ("character_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_188bacba32eb63b759f3578dd5b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_49e19e28e44eca3132dc93d8869" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_49e19e28e44eca3132dc93d8869"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_188bacba32eb63b759f3578dd5b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4843d2c18e60a0f40034a2361e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad71056f242dd581c44aa30e10"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_085d540d9f418cfbdc7bd55bb1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_188bacba32eb63b759f3578dd5"`,
    );
    await queryRunner.query(`DROP TABLE "invites"`);
  }
}
