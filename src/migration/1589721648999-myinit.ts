import {MigrationInterface, QueryRunner} from "typeorm";

export class myinit1589721648999 implements MigrationInterface {
    name = 'myinit1589721648999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lotNumber" integer NOT NULL, "availablequantity" integer NOT NULL, "thresholdQuantity" integer NOT NULL, "price" integer, "vendorname" character varying NOT NULL, "vendoremail" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"), CONSTRAINT "UQ_90f84ef03dd78d500c3af467b8c" UNIQUE ("vendorname"), CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "availablequantity"`, undefined);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "thresholdQuantity"`, undefined);
        await queryRunner.query(`ALTER TABLE "food" DROP CONSTRAINT "UQ_807dabfa50f4578e1111eefbe2d"`, undefined);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "vendorname"`, undefined);
        await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "vendoremail"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food" ADD "vendoremail" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "food" ADD "vendorname" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "food" ADD CONSTRAINT "UQ_807dabfa50f4578e1111eefbe2d" UNIQUE ("vendorname")`, undefined);
        await queryRunner.query(`ALTER TABLE "food" ADD "thresholdQuantity" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "food" ADD "availablequantity" integer NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "ingredients"`, undefined);
    }

}
