import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';
import { SQL_QUERY } from '../common/constants';


@Injectable()
export class SqlQueryLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SqlQueryLoggerMiddleware.name);

  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
      const duration = Date.now() - start;

      // SQL Execution Time Logging
      req['executionTime'] = duration;

      await this.loggerService.log(
          SQL_QUERY,
        `Execution time for ${req.method} - ${req.path}: ${duration}ms`
      );
    });
    next();
  }
}
