import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { LogExecutionTime } from "src/helpers/decorators/logExecutionTime.decorator";
import { AppQueryLogger } from "src/modules/app/entity/app.query-logger.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";


interface LogData {
    method: string;
    duration: number;
    query: string;
    status: 'success' | 'failure';
    errorMessage?: string;
}

@Injectable()
export class AppQueryBuilder {
    private readonly logger = new Logger(AppQueryBuilder.name);

    constructor(private readonly dataSource: DataSource) {}

    getRepository<T>(entity: { new (): T }): Repository<T> {
        return this.dataSource.getRepository(entity);
    }

    private async saveQueryDataIntoDatabase(logData: LogData): Promise<any> {
        const appQueryLoggerRepo = this.dataSource.getRepository(AppQueryLogger);
        const queryLog = appQueryLoggerRepo.create(logData);
       // await appQueryLoggerRepo.save(queryLog);
    }

    @LogExecutionTime()
    async executeQueryRunner(
        queryCallBack: (queryRunner: QueryRunner) => Promise<{ result: any; query: string }>
    ): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;

        try {
            const { result, query } = await queryCallBack(queryRunner);
            executedQuery = query;
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();

            status = 'failure';
            errorMessage = error.message;
            executedQuery = executedQuery;
            throw error;
        } finally {
            await queryRunner.release();
            const duration = Date.now() - startTime;
            
            await this.saveQueryDataIntoDatabase({
                method: 'executeQueryRunner',
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }

    async findByFieldId(repository: Repository<any>, field: string, value: any): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        
        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;
        const repositoryName = typeof repository.target === 'function' 
        ? repository.target.name 
        : repository.metadata.tableName;

        try {
            const record = await queryRunner.manager.findOne(repository.target, { where: { [field]: value } });
            if (!record) {
                throw new NotFoundException(`Record not found for ${field}: ${value}`);
            }
            executedQuery = queryRunner.manager
                .createQueryBuilder()
                .select()
                .from(repository.target, 'entity')
                .where(`${field} = :value`, { value })
                .getQuery();

            return record.id;
        } catch (error) {
            status = 'failure';
            errorMessage = error.message;
            executedQuery = executedQuery;
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            await queryRunner.release();
            await this.saveQueryDataIntoDatabase({
                method: `findByFieldId (${repositoryName})`,
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }

    async findByFieldName(repository: Repository<any>, field: string, value: any): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        
        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;
        const repositoryName = typeof repository.target === 'function' 
        ? repository.target.name 
        : repository.metadata.tableName;

        try {
            const record = await queryRunner.manager.findOne(repository.target, { where: { [field]: value } });
            if (!record) {
                throw new NotFoundException(`Record not found for ${field}: ${value}`);
            }
            executedQuery = queryRunner.manager
                .createQueryBuilder()
                .select()
                .from(repository.target, 'entity')
                .where(`${field} = :value`, { value })
                .getQuery();

            return record.name;
        } catch (error) {
            status = 'failure';
            errorMessage = error.message;
            executedQuery = executedQuery;
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            await queryRunner.release();
            await this.saveQueryDataIntoDatabase({
                method: `findByFieldId (${repositoryName})`,
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }

    async findByWithRelations(
        repository: Repository<any>,
        conditions: Record<string, any>,
        relations?: string[]
    ): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;
        const repositoryName = typeof repository.target === 'function' 
        ? repository.target.name 
        : repository.metadata.tableName;
    
        try {
            const record = await queryRunner.manager.findOne(repository.target, {
                where: conditions,
                relations,
            });

            if (!record) {
               return null;
            }
    
            const queryBuilder = queryRunner.manager.createQueryBuilder()
                .select()
                .from(repository.target, 'entity');
    
            Object.keys(conditions).forEach((field, index) => {
                queryBuilder.andWhere(`entity.${field} = :${field}`, { [field]: conditions[field] });
            });
    
            executedQuery = queryBuilder.getQuery();
    
            return record;
        } catch (error) {
            status = 'failure';
            errorMessage = error.message;
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            await queryRunner.release();
    
            await this.saveQueryDataIntoDatabase({
                method: `findByWithRelations (${repositoryName})`,
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }

    async findAllByWithRelations(
        repository: Repository<any>,
        andConditions: Record<string, any>, // AND conditions
        relations?: string[],
        orConditionsArray?: { field: string; value: any }[] // OR conditions
    ): Promise<any> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;
        const repositoryName = typeof repository.target === 'function'
            ? repository.target.name
            : repository.metadata.tableName;
    
        try {
            const queryBuilder = queryRunner.manager.createQueryBuilder()
                .select()
                .from(repository.target, 'entity');
            Object.keys(andConditions).forEach((field) => {
                queryBuilder.andWhere(`entity.${field} = :${field}`, { [field]: andConditions[field] });
            });
            if (orConditionsArray && orConditionsArray.length > 0) {
                const orWhereClause = orConditionsArray
                    .map((condition, index) => `entity.${condition.field} = :orCondition${index}`)
                    .join(' OR ');
    
                const orConditionParams = orConditionsArray.reduce((acc, condition, index) => {
                    acc[`orCondition${index}`] = condition.value;
                    return acc;
                }, {} as Record<string, any>);

                queryBuilder.andWhere(`(${orWhereClause})`, orConditionParams);
            }
    
            executedQuery = queryBuilder.getQuery();
            const record = await queryBuilder.addSelect('entity').getMany();
    
            return record;
        } catch (error) {
            status = 'failure';
            errorMessage = error.message;
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            await queryRunner.release();
    
            await this.saveQueryDataIntoDatabase({
                method: `findByWithRelations (${repositoryName})`,
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }
    
    async findAndCountWithRelations(
        repository: Repository<any>,
        conditions: Record<string, any>, 
        relations: string[] = [],   
        limit?: number,          
        offset?: number
    ): Promise<{ data: any[]; count: number }> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
    
        const startTime = Date.now();
        let executedQuery: string | undefined;
        let status: 'success' | 'failure' = 'success';
        let errorMessage: string | undefined;
        const repositoryName = typeof repository.target === 'function'
            ? repository.target.name
            : repository.metadata.tableName;
    
        try {
            // Find data with count for pagination
            const [data, count] = await queryRunner.manager.findAndCount(repository.target, {
                where: conditions,
                relations,
                take: limit,
                skip: offset,
            });
    
            const queryBuilder = queryRunner.manager.createQueryBuilder()
                .select()
                .from(repository.target, 'entity');
    
            // Apply each condition to the query builder
            Object.keys(conditions).forEach((field) => {
                queryBuilder.andWhere(`entity.${field} = :${field}`, { [field]: conditions[field] });
            });
    
            if (limit) queryBuilder.take(limit);
            if (offset) queryBuilder.skip(offset);
    
            executedQuery = queryBuilder.getQuery();
    
            return { data, count };
        } catch (error) {
            status = 'failure';
            errorMessage = error.message;
            throw error;
        } finally {
            const duration = Date.now() - startTime;
            await queryRunner.release();
    
            await this.saveQueryDataIntoDatabase({
                method: `findAndCountWithRelations (${repositoryName})`,
                duration,
                query: executedQuery,
                status,
                errorMessage,
            });
        }
    }
}



