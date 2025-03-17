// src/apm.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import ApmTool from 'apm-manager-tool';

@Injectable()
export class APMMiddleware implements NestMiddleware {
    private apmTool: any;

    constructor() {
        this.apmTool = new ApmTool(); // Create an instance of the class
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.apmTool.trackExecutionTimeMiddleware(req, res, next);
    }
}
