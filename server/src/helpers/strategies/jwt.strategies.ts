import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    const tokenFromCookies = request?.cookies?.["auth-token"];
                    const tokenFromHeaders = request?.headers?.authorization?.split(" ")[1];
                    return tokenFromCookies || tokenFromHeaders || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET_KEY"),
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {

        const token = request?.cookies?.["auth-token"] || 
                      request?.headers?.authorization?.split(" ")[1];
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        const isBlacklisted = await this.cacheManager.get(token);


        if (isBlacklisted === 'blacklisted') {
            throw new UnauthorizedException('Session expired or invalid');
        }
        const redisGet = await this.cacheManager.get(`${payload?.id}${payload?.email}`);
        if (!redisGet) {
            throw new UnauthorizedException('Session expired or invalid');
        }
        const userData = JSON.parse(redisGet as string);
        return {
            user: userData.user,
        };
    }
}
