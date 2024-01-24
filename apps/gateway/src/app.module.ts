import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import * as Joi from "joi"
import { CarsService } from "./graphql/car.service"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { ConfigModule } from "@nestjs/config"
import { RmqModule } from "@common/rmq/rmq.module"
import { CHAT_SERVICE } from "@common/constants"
import { CarResolver } from "./graphql/car.resolver"
import { PrismaModule } from "@common/database/prisma.module"
import { AuthModule } from "./auth/auth.module"

const SCHEMA = {
    PORT: Joi.number().required(),
    RABBIT_MQ_URI: Joi.string().required(),
    RABBIT_MQ_CHAT_QUEUE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required()
}

export function schemaProperty(name: keyof typeof SCHEMA) {
    return name
}

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object(SCHEMA),
            envFilePath: "apps/gateway/.env"
        }),
        RmqModule.register({
            name: CHAT_SERVICE
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: join(process.cwd(), "generated/schema.graphql"),
            buildSchemaOptions: { dateScalarMode: "timestamp" },
            plugins: [ApolloServerPluginLandingPageLocalDefault()]
        })
    ],
    providers: [CarResolver, CarsService]
})
export class AppModule {}
