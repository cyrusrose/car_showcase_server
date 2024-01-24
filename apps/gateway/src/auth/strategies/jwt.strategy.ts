import { Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { TokenPayload } from "../auth.service"
import { UsersService } from "../users/users.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    // console.log(request?.headers)
                    return request?.headers?.authentication // html or graphql
                }
            ]),
            secretOrKey: configService.get("JWT_SECRET")
        })
    }

    // assign user param to request
    async validate({ userId }: TokenPayload) {
        try {
            return await this.usersService.getUser(userId)
        } catch (err) {
            throw new UnauthorizedException("problem")
        }
    }
}
