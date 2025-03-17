import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ReturnRequest {
    async successRequest(data: any):Promise<any> {
        return {
            data:data,
            statusCode:200,
            status:'success'
        }
    }
}