import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPortraitInStatusCharacters1733163920039
  implements MigrationInterface
{
  name = 'AddPortraitInStatusCharacters1733163920039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status_characters" ADD "portrait" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "status_characters" DROP COLUMN "portrait"`,
    );
  }
}
