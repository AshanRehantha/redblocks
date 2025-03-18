import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/helpers/strategies/local.strategy';
import { JwtStrategy } from 'src/helpers/strategies/jwt.strategies';
import { Encryption } from 'src/helpers/common/encrypet/encrypte';
import { CacheModule } from '@nestjs/cache-manager';
import { AppLoginAttempts } from '../app/entity/app.login-attempts.entity';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { AppStatus } from '../app/entity/app.status.entity';
import { Customer } from '../user/entity/user.audit.entity';
import { UserMaster } from '../user/entity/user-master.entity';
import { PusherService } from 'src/helpers/common/pusher/pusherService';

@Module({
  imports: [
    PassportModule,
    CacheModule.register({
      ttl: 3000000, // Time to live in seconds
      max: 100, // Maximum number of items in cache
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          secret: configService.get("JWT_SECRET_KEY"),
          signOptions: {
              expiresIn: configService.get("JWT_EXPIRES_IN"),
          },
      }),
  }),
    TypeOrmModule.forFeature([
      User,
      AppLoginAttempts,
      AppStatus,

      Customer,
      UserMaster,
  ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, Encryption, AppQueryBuilder, PusherService]
})
export class AuthModule {}
