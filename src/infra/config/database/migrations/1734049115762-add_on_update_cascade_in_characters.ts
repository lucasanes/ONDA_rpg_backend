import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnUpdateCascadeInCharacters1734049115762 implements MigrationInterface {
    name = 'AddOnUpdateCascadeInCharacters1734049115762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5"`);
        await queryRunner.query(`ALTER TABLE "main_characters" DROP CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21"`);
        await queryRunner.query(`ALTER TABLE "status_characters" DROP CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "main_characters" ADD CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "status_characters" ADD CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status_characters" DROP CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5"`);
        await queryRunner.query(`ALTER TABLE "main_characters" DROP CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5"`);
        await queryRunner.query(`ALTER TABLE "status_characters" ADD CONSTRAINT "FK_77eae8bdb81927d09a727fc34f5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "main_characters" ADD CONSTRAINT "FK_a8ff8faee75cfd87d14da4dca21" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_4843d2c18e60a0f40034a2361e5" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
