import { Injectable } from '@nestjs/common';
import { AppDetailsDto } from './dto/app.dto';
import { AppQueryBuilder } from 'src/helpers/common/queryBuilder/appQueryBuilder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(


    private queryBuilder:AppQueryBuilder
  ){}
  async getAppDetails(request: any, payload: AppDetailsDto): Promise<any> {
   // const queryLogger = await this.queryBuilder.findAllByWithRelations(this.hrDepartment, {});
  }
}
