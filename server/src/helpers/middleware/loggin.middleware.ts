import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApmService } from 'src/modules/apm/apm.service';


@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(
        private readonly apmService: ApmService
    ) {}

  async use(req: Request, res: Response, next: Function) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        responseTime: `${duration}ms`,
        timestamp: new Date(),
      };
     // this.apmService.createLog(logData);
    });
    next();
  }
}