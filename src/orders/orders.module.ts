import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Order } from '../enitity/orders.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {LoggerModule} from '../logger/logger.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]), LoggerModule],
  providers: [OrdersService],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
