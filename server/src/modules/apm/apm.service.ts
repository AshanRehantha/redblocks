import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { AppApmLogger } from './entity/app_apm_logger.entity';
import { AppApmErrorLogger } from './entity/app_apm_error_logger.entity';
import { LogExecutionTime } from 'src/helpers/decorators/logExecutionTime.decorator';

@Injectable()
export class ApmService {
    constructor(
        @InjectRepository(AppApmLogger)
        private readonly apmRepository: Repository<AppApmLogger>,

        @InjectRepository(AppApmErrorLogger)
        private readonly apmErrorRepository: Repository<AppApmErrorLogger>,

        private readonly queryBuilder: AppQueryBuilder,
    ){}
    async createLog(payload: any):Promise<any> {

        const logger = new AppApmLogger();

        logger.method = payload.method;
        logger.path = payload.path;
        logger.statusCode = payload.statusCode;
        logger.responseTime = payload.responseTime;

    }

    async createErrorLog(payload: any):Promise<any> {
        const logger = new AppApmErrorLogger();

        logger.method = payload.method;
        logger.path = payload.path;
        logger.statusCode = payload.statusCode;
        logger.responseTime = payload.responseTime;
        logger.message = payload.message.message;
    }
}