import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import { UsersModule } from "./users/users.module"
import { PrismaModule } from "@common/database/prisma.module"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import cookieParser from "cookie-parser"

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: `${configService.get("JWT_EXPIRATION")}s`
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes("*")
    }
}
