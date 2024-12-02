import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAllTables1733105043669 implements MigrationInterface {
    name = 'AddAllTables1733105043669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "session_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "session_id" integer, "character_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "main_characters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "xp" integer NOT NULL DEFAULT '0', "age" integer NOT NULL, "class" character varying NOT NULL, "race" character varying NOT NULL, "divinity" character varying NOT NULL, "origin" character varying NOT NULL, "ts" integer NOT NULL DEFAULT '0', "tp" integer NOT NULL DEFAULT '0', "to" integer NOT NULL DEFAULT '0', "character_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a8ff8faee75cfd87d14da4dca2" UNIQUE ("character_id"), CONSTRAINT "PK_304d4cc2764724975e49d3f827d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8ff8faee75cfd87d14da4dca2" ON "main_characters" ("character_id") `);
        await queryRunner.query(`CREATE TABLE "status_characters" ("id" SERIAL NOT NULL, "hp" integer NOT NULL DEFAULT '0', "current_hp" integer NOT NULL DEFAULT '0', "mp" integer NOT NULL DEFAULT '0', "current_mp" integer NOT NULL DEFAULT '0', "mun" integer NOT NULL DEFAULT '0', "current_mun" integer NOT NULL DEFAULT '0', "defense" integer NOT NULL DEFAULT '0', "cd" integer NOT NULL DEFAULT '0', "character_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_77eae8bdb81927d09a727fc34f" UNIQUE ("character_id"), CONSTRAINT "PK_0aafc6284438bf5cdf36be36a9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77eae8bdb81927d09a727fc34f" ON "status_characters" ("character_id") `);
        await queryRunner.query(`CREATE TABLE "characters" ("id" SERIAL NOT NULL, "is_public" boolean NOT NULL DEFAULT false, "user_id" integer NOT NULL, "session_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c6e648aeaab79e4213def02aba" ON "characters" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bec94b9b8ecb9167cb981c7a17" ON "characters" ("session_id") `);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_ba3575d2fbe71fab7155366235e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_ad71056f242dd581c44aa30e106" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main_characters" ADD CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "status_characters" ADD CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_c6e648aeaab79e4213def02aba8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characters" ADD CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_bec94b9b8ecb9167cb981c7a17b"`);
        await queryRunner.query(`ALTER TABLE "characters" DROP CONSTRAINT "FK_c6e648aeaab79e4213def02aba8"`);
        await queryRunner.query(`ALTER TABLE "status_characters" DROP CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5"`);
        await queryRunner.query(`ALTER TABLE "main_characters" DROP CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_ad71056f242dd581c44aa30e106"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_62d53fac6841c71b3ffa9a85fb7"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_ba3575d2fbe71fab7155366235e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bec94b9b8ecb9167cb981c7a17"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c6e648aeaab79e4213def02aba"`);
        await queryRunner.query(`DROP TABLE "characters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77eae8bdb81927d09a727fc34f"`);
        await queryRunner.query(`DROP TABLE "status_characters"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8ff8faee75cfd87d14da4dca2"`);
        await queryRunner.query(`DROP TABLE "main_characters"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "players"`);
    }

}
