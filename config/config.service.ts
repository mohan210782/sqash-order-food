// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Users } from '../src/enitity/users.entity';
import { Order} from '../src/enitity/orders.entity';
import { Foods} from '../src/enitity/foods.entity';
import { Ingredients } from '../src/enitity/Ingredients.entity';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      
        type: 'postgres',
        host: this.getValue('POSTGRES_HOST'),
        port: parseInt(this.getValue('POSTGRES_PORT')),
        username: this.getValue('POSTGRES_USER'),
        password: this.getValue('POSTGRES_PASSWORD'),
        database: this.getValue('POSTGRES_DATABASE'),
      
      //entities: ["src/entity/*.entity{.ts,.js}"],
      //entities: [ Users, Order, Foods],
        entities: [join(__dirname, './**/*.entity{.ts,.js}'), Foods, Users, Order, Ingredients],
        migrations: [
            "src/migrations/**/*{.ts,.js}"
        ],
        subscribers: [
            "src/subscriber/**/*.ts"
        ],

        cli: {
          
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
        },

        ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE'
  ]);

export { configService };