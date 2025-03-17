import {
    Inject,
    Injectable,
    Req,
    UnauthorizedException,

} from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../../modules/auth/auth.service";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
        super({ passReqToCallback: true });
    }

    async validate(
        @Req() request: any,
        username: string,
        password: string,
    ): Promise<any> {  

        const payload = {
            email: username,
            password: password,
        }

        const user = await this.authService.signIn(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        const existingUser = await this.cacheManager.get(user.id + user.email);
        
        if(existingUser){
            await this.cacheManager.del(user.id + user.email);
        }

        await this.cacheManager.set(user.id + user.email, JSON.stringify({ user: { ...user } }));
        
       return user;
    }
}