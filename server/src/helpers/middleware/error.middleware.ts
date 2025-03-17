import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApmService } from 'src/modules/apm/apm.service';
@Injectable()
export class ErrorTrackingMiddleware implements NestMiddleware {
  constructor(private readonly apmService: ApmService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    const originalSend = res.send.bind(res);

    res.send = (body) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (res.statusCode >= 400) {
        let errorMessage = 'Client Error';

        try {
          const jsonBody = JSON.parse(body);
          if (jsonBody.message) {
            errorMessage = jsonBody.message;
          }
        } catch (e) {
        }
      }

      return originalSend(body);
    };

    next();
  }
}