import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { WinstonModule } from 'nest-winston';
//import { FoodsModule } from './foods/foods.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerModule} from './logger/logger.module';
import { FoodsModule } from './foods/foods.module';
import { LoggerService} from './logger/logger.service';
import { IngredientsModule } from './ingredients/ingredients.module';


@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmConfig()), 
    WinstonModule.forRoot({}),  
    // TypeOrmModule.forFeature([Users], 'sqahfoods'), 
    // TypeOrmModule.forFeature([Order], 'sqahfoods'), 
    UsersModule,
    AuthModule,
    OrdersModule,
    FoodsModule,
    LoggerModule,
    IngredientsModule ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}