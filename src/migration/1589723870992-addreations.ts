import {MigrationInterface, QueryRunner} from "typeorm";

export class addreations1589723870992 implements MigrationInterface {
    name = 'addreations1589723870992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foodorders" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "foodorders" ADD CONSTRAINT "FK_4d21b98738d758ee4032e169085" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "foodorders" DROP CONSTRAINT "FK_4d21b98738d758ee4032e169085"`, undefined);
        await queryRunner.query(`ALTER TABLE "foodorders" DROP COLUMN "userId"`, undefined);
    }

}
