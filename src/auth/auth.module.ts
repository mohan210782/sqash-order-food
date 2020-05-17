import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LoggerModule} from '../logger/logger.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { from } from 'rxjs';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    LoggerModule,
    JwtModule.register({
      secret: 'Codebrains',
      signOptions: { expiresIn: 3600 },
    }),
   
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}