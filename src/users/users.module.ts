

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Users } from "../enitity/users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Users]), LoggerModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}