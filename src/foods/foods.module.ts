import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Foods } from "../enitity/foods.entity";
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Foods])],
  providers: [FoodsService],
  exports: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
