import { Body, Controller, Post, Request, Response, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
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

    await this.pusherService.trigger(`private-user-${request.user.id}`, 'user-logged-in', {
        message: 'User logged in successfully',
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

   @Public() 
   @UseFilters(HttpExceptionFilter)
   @Post('pusher/auth')
   async pusherAuth(@Body() body: any, @Request() req: any) {
       const socketId = body.socket_id;
       const channel = body.channel_name;
       
       try {
           // Get authentication response from Pusher
           const authResponse = this.pusherService.authenticate(socketId, channel);
           
           // Return with status 200 explicitly (not 201)
           return authResponse;
       } catch (error) {
           throw new UnauthorizedException('Not authorized to subscribe to this channel');
       }
   }

    

}
