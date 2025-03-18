import { NestFactory, Reflector } from '@nestjs/core';

import helmet from 'helmet';
import * as cookieParser from "cookie-parser";
import { AuthGuard } from './helpers/guard/jwt.auth.guard';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './helpers/filters/http-exception.filter';
import 'reflect-metadata';
import * as winston from "winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import { WinstonModule,  utilities as nestWinstonModuleUtilities, } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
          new winston.transports.Console({
              format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.timestamp(),
                  winston.format.ms(),
                  nestWinstonModuleUtilities.format.nestLike(),
              ),
             // silent: process.env.NODE_ENV === 'production'
          }),
          new DailyRotateFile({
              filename: "application-%DATE%.log",
              datePattern: "YYYY-MM-DD",
              zippedArchive: true,
              maxSize: "1m",
              maxFiles: "14d",
              dirname: "Logs",
             // level: process.env.LOG_LEVEL,
              format: winston.format.combine(
                  winston.format.timestamp({
                      format: "YYYY/MM/DD HH:mm:ss",
                  }),
                  winston.format.printf(
                      (info) =>
                          `[${info.timestamp}] ${info.level} : ${info.message}`,
                  ),
              ),
          }),
      ],
  }),
  });
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const configService = app.get(ConfigService);
  const environment = configService.get<string>("NODE_ENV");
  const port = configService.get<number>("PORT");
  const host = configService.get<string>("HOST");

  app.enableCors({
    origin: [
      'http://localhost:8787', 
      'http://0.0.0.0:8787',
      // If you're accessing with the machine's IP address, you might need to add that too
    ],
    methods: configService.get<string>("CORS_OPTIONS_METHODS"),
    allowedHeaders: configService.get<string>("CORS_OPTIONS_ALLOW_HEADERS"),
    credentials: true,
  });

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(cookieParser());
  


  app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', configService.get<string>("CONTENT_SECURITY_POLICY"));
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'no-sniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

  await app.listen(3000);
}
bootstrap();
