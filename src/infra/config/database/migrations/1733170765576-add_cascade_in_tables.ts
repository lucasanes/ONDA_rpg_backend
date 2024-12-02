import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeInTables1733170765576 implements MigrationInterface {
  name = 'AddCascadeInTables1733170765576';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "FK_ba3575d2fbe71fab7155366235e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recoveries" DROP CONSTRAINT "FK_9fdd487bb731364f115e892f1bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_188bacba32eb63b759f3578dd5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_49e19e28e44eca3132dc93d8869"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_ad71056f242dd581c44aa30e106"`,
    );
    await queryRunner.query(
      `ALTER TABLE "main_characters" DROP CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_c6e648aeaab79e4213def02aba8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status_characters" DROP CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_ba3575d2fbe71fab7155366235e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recoveries" ADD CONSTRAINT "FK_9fdd487bb731364f115e892f1bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_188bacba32eb63b759f3578dd5b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_49e19e28e44eca3132dc93d8869" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_ad71056f242dd581c44aa30e106" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "main_characters" ADD CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_c6e648aeaab79e4213def02aba8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "status_characters" ADD CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status_characters" DROP CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" DROP CONSTRAINT "FK_c6e648aeaab79e4213def02aba8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "main_characters" DROP CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_ad71056f242dd581c44aa30e106"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_49e19e28e44eca3132dc93d8869"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_188bacba32eb63b759f3578dd5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recoveries" DROP CONSTRAINT "FK_9fdd487bb731364f115e892f1bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" DROP CONSTRAINT "FK_ba3575d2fbe71fab7155366235e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status_characters" ADD CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_c6e648aeaab79e4213def02aba8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "characters" ADD CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "main_characters" ADD CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_ad71056f242dd581c44aa30e106" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_49e19e28e44eca3132dc93d8869" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_188bacba32eb63b759f3578dd5b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "recoveries" ADD CONSTRAINT "FK_9fdd487bb731364f115e892f1bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_ba3575d2fbe71fab7155366235e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "players" ADD CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
