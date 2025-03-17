import { Controller, Post, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { Public } from 'src/helpers/decorators/public.decorator';
import { LocalAuthGuard } from 'src/helpers/guard/local.auth.guard';
import { HttpExceptionFilter } from 'src/helpers/filters/http-exception.filter';

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,

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


}
