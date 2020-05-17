import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEnumUser1589725975156 implements MigrationInterface {
    name = 'changeEnumUser1589725975156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum" RENAME TO "users_status_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "users_status_enum" AS ENUM('active', 'inactive')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "users_status_enum" USING "status"::"text"::"users_status_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`, undefined);
        await queryRunner.query(`DROP TYPE "users_status_enum_old"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_status_enum_old" AS ENUM('active', 'Inactive')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "users_status_enum_old" USING "status"::"text"::"users_status_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`, undefined);
        await queryRunner.query(`DROP TYPE "users_status_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "users_status_enum_old" RENAME TO  "users_status_enum"`, undefined);
    }

}
