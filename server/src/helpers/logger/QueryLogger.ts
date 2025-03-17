import { Logger as TypeOrmLogger, QueryRunner, DataSource } from 'typeorm';
import { LoggerService } from './logger.service';
import { LOGGER_TYPES } from '../common/constants';

export class QueryExecutionLogger implements TypeOrmLogger {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly dataSource: DataSource
  ) {}

  async logQuery(query: string, parameters?: any[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    const startTime = Date.now();
    try {

      const executionTime = Date.now() - startTime;
      const tableName = this.getTableNameFromQuery(query);
      
      const excludedTables = ['app_cpu_usage_details', 'app_apm_cpu_process_time'];
      if (excludedTables.includes(tableName)) {
          return ""; 
      }

      this.loggerService.log(
        LOGGER_TYPES.LOGGER_DB,
        `TableName: ${tableName} | Execution time: ${executionTime}ms`
      );
  
      return "";
    } catch (error) {
      this.loggerService.error(
        `Query error: ${error.message} | Parameters: ${JSON.stringify(parameters)}`
      );
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  

  // Method to extract the table name from the query
  private getTableNameFromQuery(query: string): string | null {
    const regex = /\b(?:FROM|INTO|UPDATE|JOIN)\s+`?([a-zA-Z0-9_]+)`?\b/i;
    const match = query.match(regex);
    return match ? match[1] : null;
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log("Hit");
    
    this.loggerService.error(`Query error: ${error} | Query: ${query} | Parameters: ${JSON.stringify(parameters)}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.loggerService.warn(`Slow query detected: ${query} | Execution time: ${time}ms | Parameters: ${JSON.stringify(parameters)}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.loggerService.log('', `Schema build: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.loggerService.log('', `Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn' | 'error', message: any, queryRunner?: QueryRunner) {
    if (level === 'log') {
      this.loggerService.log('', message);
    } else if (level === 'info') {
      this.loggerService.verbose(message);
    } else if (level === 'warn') {
      this.loggerService.warn(message);
    }
  }
}
