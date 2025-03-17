import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { BullModule } from '@nestjs/bull';
import { LogProcessor } from './logger.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { AppApmQueryExecution } from 'src/modules/app/entity/app.apm_query_exection.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppApmQueryExecution
    ]),
    BullModule.forRoot({
      redis: {
        host: 'redis-app',
        port: 6379,
        username: 'default',
        password: 'yourpassword',
      },
    }),
    BullModule.registerQueue({
      name: 'log-queue',
      defaultJobOptions: {
        attempts: 1,
      },
      settings: {
        maxStalledCount: 0,
      },
    }),
    
  ],
  providers: [
    LoggerService,
    LogProcessor,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = new Redis({
          host: 'redis-app',
          port: 6379,
          username: 'default',
          password: 'yourpassword',
          retryStrategy: (times) => Math.min(times * 50, 2000),
        });

        client.on('error', (err) => {
          console.error('Redis connection error:', err);
        });

        return client;
      },
    },
  ],
  exports: [LoggerService, 'REDIS_CLIENT'],
})
export class LoggerModule {}
