import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppApmLogger } from './entity/app_apm_logger.entity';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { AppApmErrorLogger } from './entity/app_apm_error_logger.entity';
import { ApmService } from './apm.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            AppApmLogger,
            AppApmErrorLogger
        ])
    ],
    providers: [ApmService, AppQueryBuilder, HttpExceptionFilter],
    exports: [ApmService]
})
export class ApmModule {}
