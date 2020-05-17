import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {LoggerService} from './logger/logger.service';
import { OrdersModule} from './orders/orders.module';
import { AuthModule} from './auth/auth.module';
import { FoodsModule} from './foods/foods.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Order} from './enitity/orders.entity';
import { getMaxListeners } from 'cluster';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Order Food API')
  .setDescription('API for ordering food, Signup as user and order your food')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
//const document = SwaggerModule.createDocument(app, options);
const document = SwaggerModule.createDocument(app, options, {
  include : [
    AuthModule, 
    OrdersModule,
    FoodsModule,
    IngredientsModule
  ]
});
SwaggerModule.setup('api', app, document);
app.useLogger(await app.resolve(LoggerService));
  await app.listen(3002);
}
bootstrap();
