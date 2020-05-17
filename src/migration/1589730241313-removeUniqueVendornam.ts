import {MigrationInterface, QueryRunner} from "typeorm";

export class removeUniqueVendornam1589730241313 implements MigrationInterface {
    name = 'removeUniqueVendornam1589730241313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "UQ_90f84ef03dd78d500c3af467b8c"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "UQ_90f84ef03dd78d500c3af467b8c" UNIQUE ("vendorname")`, undefined);
    }

}
