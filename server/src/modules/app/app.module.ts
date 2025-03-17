import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PermissionModule } from '../permission/permission.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PermissionMiddleware } from 'src/helpers/middleware/permission.middleware';
import { APMMiddleware } from 'src/helpers/middleware/apm.middleware';
import { ApmModule } from '../apm/apm.module';
import { SqlQueryLoggerMiddleware } from 'src/helpers/middleware/sqlQueryLoggerMiddleware';
import { LoggerModule } from 'src/helpers/logger/logger.module';
import { QueryExecutionLogger } from 'src/helpers/logger/QueryLogger';
import { LoggerService } from 'src/helpers/logger/logger.service';
import { CpuMonitorService } from 'src/helpers/common/CupMonitorService';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { TaskModule } from '../task/task.module';


@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: [`config/.${process.env.NODE_ENV}.env`, "config/.env"],
    }),
    CacheModule.register(),

    TypeOrmModule.forRootAsync({
      useFactory: async (loggerService: LoggerService) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: '172.22.0.3',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: false,
        });
        await dataSource.initialize();
        return {
          type: 'postgres',
          host: '172.22.0.3',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: false,
          logging: ['query', 'error'],
          logger: new QueryExecutionLogger(loggerService, dataSource),
        };
      },
      inject: [LoggerService],
    }),

    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
          user: 'b3273874d7a704',
          pass: '6824f01bad2920',
        },
      },
      template: {
        dir:process.cwd() +
        "/server/src/modules/mail/mailTemplate",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    AuthModule,
    UserModule.register(),
    PermissionModule,
    ApmModule,
    LoggerModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, CpuMonitorService, AppQueryBuilder],
})
export class AppModule{
  constructor(private readonly dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(PermissionMiddleware)
    .exclude(
      { path: 'user/login', method: RequestMethod.ALL },
      { path: 'user/logout', method: RequestMethod.ALL }
    )
    .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
        .apply(APMMiddleware)
        .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
        .apply(SqlQueryLoggerMiddleware)
        .forRoutes('*');

  }
}
