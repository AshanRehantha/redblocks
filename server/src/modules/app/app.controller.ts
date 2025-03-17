import { Body, Controller, Get, Post, Request, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { AppDetailsDto } from './dto/app.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) 
  {}

  @UseFilters(HttpExceptionFilter)
  @Post("/get-status")
   async getCustomer(
       @Request() request:any,
       @Body() params: AppDetailsDto,
   ): Promise<any> {

   const respond = await this.appService.getAppDetails(request, params);

   return respond;
  }

}
