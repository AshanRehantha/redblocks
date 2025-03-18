import { Body, Controller, Post, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Public } from 'src/helpers/decorators/public.decorator';
import { LocalAuthGuard } from 'src/helpers/guard/local.auth.guard';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';
import { PusherService } from 'src/helpers/common/pusher/pusherService';

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly pusherService: PusherService,
   ) {}

   @Public()
   @UseGuards(LocalAuthGuard)
   @UseFilters(HttpExceptionFilter)
   @Post("/login")
   async login(
    @Request() request:any,
    @Response({ passthrough: true }) response: any
): Promise<any> {
    const token = await this.authService.jwtToken(request.user);

    response.cookie("auth-token", token, {  
        httpOnly: true, 
        sameSite: 'Strict', 
        path: '/',
    });

    response.cookie("isUserLogin", 'true', {  
        sameSite: 'Strict', 
        path: '/',
        expires: new Date("2100-12-31"),
    });

    return {
        data:{'bearer_token': token},
        statusCode:200,
        status:'success'
    }
    }

   @UseFilters(HttpExceptionFilter)
   @Post("/logout")
   async logout(@Request() request: any,  @Response({ passthrough: true }) response: any): Promise<any> {
        await this.authService.logOut(request);
        response.clearCookie('auth-token', {
            httpOnly: true, 
            sameSite: 'Strict', 
            path: '/',
          });
          response.clearCookie('isUserLogin', {
            sameSite: 'Strict', 
            path: '/',
            expires: new Date(0),
          });

          return {
            data:"",
            statusCode:200,
            status:'success'
        }
   }

   @UseFilters(HttpExceptionFilter)
   @Post("/pusher-auth")
   async pusherAuth(
       @Request() request: any,
       @Body() body: any
   ): Promise<any> {
       // Extract user from request (based on your auth setup)
       const user = request.user;
       
       if (!user) {
           return {
               status: 'error',
               statusCode: 403,
               message: 'Unauthorized'
           };
       }
       
       // Add guards to check if the necessary parameters exist
       console.log('body', body);
       
       const socketId = body.socket_id;
       const channel = body.channel_name;
       
       if (!socketId || !channel) {
           return {
               status: 'error',
               statusCode: 400,
               message: 'Missing socket_id or channel_name in the request body'
           };
       }
       
       // Now we can safely check the channel name
       if (channel.startsWith('private-user-') && channel === `private-user-${user.id}`) {
           // Authorize the channel
           const authResponse = this.pusherService.authorizeChannel(socketId, channel);
           return authResponse;
       }
       
       return {
           status: 'error',
           statusCode: 403,
           message: 'Channel authorization failed'
       };
   }


}
