import { Injectable, Logger } from '@nestjs/common';
import { CPU_MONITOR, LOGGER_TYPES, SQL_QUERY } from '../common/constants';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor(
    @InjectQueue('log-queue') 
    private readonly logQueue: Queue
  ) {
    this.logger = new Logger();
  }

  async log(type: string, message: string) {


    if (type === LOGGER_TYPES.LOGGER_DB) {
      await this.logQueue.add('log', {level: 'info', type: 'log', message }, { priority: 1 });
    }else if(type === SQL_QUERY){
      await this.logQueue.add('api', {level: 'info', type: 'log', message }, { priority: 2 });
    }else if(type === CPU_MONITOR){
      await this.logQueue.add('cpu', {level: 'info', type: 'log', message }, { priority: 2 });
    }
    
    else {
      this.logger.log(message);
    }
  }

  error(message: string, trace?: string) {
    console.log('error');
    
    this.logger.error(`${message} ${trace ? `- Trace: ${trace}` : ''}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
