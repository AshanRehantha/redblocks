import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { AppApmQueryExecution } from 'src/modules/app/entity/app.apm_query_exection.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AppApmCpuProcessTime } from 'src/modules/app/entity/app.apm_cpu_process_time.entity';
import { AppCpuUsageDetails } from 'src/modules/app/entity/app_cpu_usage_details.entity';
import { AppApmExecutionDetails } from 'src/modules/app/entity/app_apm_api_excution_details.entity';

@Processor('log-queue')
export class LogProcessor {
  
  constructor(

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    
  }

  @Process('log')
  async handleLog(job: Job) {
    const { level, message, meta } = job.data;

    const regex = /TableName:\s*([\w\d_]+)\s*\|\s*Execution\s+time:\s*(\d+)ms/;
    const match = message.match(regex);

    if (!level || !message) {
      return;
    }

    if(match){

      const tableName = match[1];
      const executionTime = match[2];

      if (tableName === 'app_apm_query_execution' || tableName === 'app_apm_cpu_process_time' || tableName === 'app_apm_api_excution_details') {
        return;
      }
      
      if (!tableName || tableName.trim() === 'null') {
        return;
      }

        const query = new AppApmQueryExecution();
        query.tableName = tableName;
        query.executionTime = `${executionTime} ms`;
        query.isLowQuery = (executionTime < 10) ? 'false' :  'true';

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          await queryRunner.manager.createQueryBuilder()
          .insert()
          .into(AppApmQueryExecution)
          .values({
            tableName: tableName,
            executionTime: `${executionTime} ms`,
            isLowQuery: executionTime < 10 ? 'false' : 'true',
          })
          .orIgnore()
          .execute();
          await queryRunner.commitTransaction();
        }catch (error) {
          await queryRunner.rollbackTransaction();
        }
        finally {
          await queryRunner.release();
        }
    }
  }

  @Process('cpu')
  async handleCpuMonitoring(job: Job) {

    const { level, message, meta } = job.data;

    const regex = /Date:\s*(\d{4}-\d{2}-\d{2})\s*Time\s*:\s*(\d{2}:\d{2}:\d{2})\s*-\s*CPU\s*Details\s*during\s*request:\s*(\{.*\})/;

    const match = message.match(regex);

    if (match) {
      const date = match[1];
      const time = match[2];
      const cpuDetails = JSON.parse(match[3]);

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const cpuProcess = await queryRunner.manager.createQueryBuilder()
        .insert()
        .into(AppApmCpuProcessTime)
        .values({
          totalCpus: cpuDetails.totalCpus,
          overallCpuUsage: cpuDetails.overallCpuUsage,
          activeCpus:cpuDetails.activeCpus,
          cpuDetails:"",
          date: date,
          time: time
        })
        .execute();

        const insertedId = cpuProcess.identifiers[0].id;

        await queryRunner.manager.createQueryBuilder()
        .insert()
        .into(AppCpuUsageDetails)
        .values(
          cpuDetails.cpuDetails.map((details: any) => ({
            cpuId:insertedId,
            cpu:details.cpu,
            cpuUsage: details.usage,
            isActive: details.isActive
          }))
        )
        .orIgnore()
        .execute();

        await queryRunner.commitTransaction();
      }catch (error) {
        await queryRunner.rollbackTransaction();
      }
      finally {
        await queryRunner.release();
      }
    }
  }

  @Process('api')
  async handleApiMonitoring(job: Job) {
    const { level, message, meta } = job.data;
    const regex = /(\bPOST\b) - ([^:]+): (\d+ms)/;
    const match = message.match(regex);
    if (match) {

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();


      try {
        await queryRunner.manager.createQueryBuilder()
        .insert()
        .into(AppApmExecutionDetails)
        .values({
          method: match[1],
          path: match[2],
          time:match[3],
        })
        .execute();

        await queryRunner.commitTransaction();
      }catch (error) {
        await queryRunner.rollbackTransaction();
      }
      finally {
        await queryRunner.release();
      }
    }   
  }
}