
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Ingredients } from "../enitity/Ingredients.entity";
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredients]), LoggerModule],
  providers: [IngredientsService, LoggerService],
  exports: [IngredientsService, LoggerService],
  controllers: [IngredientsController],
})
export class IngredientsModule {}

