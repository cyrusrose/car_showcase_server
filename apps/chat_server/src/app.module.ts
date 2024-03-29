import { Module } from "@nestjs/common"
import * as Joi from "joi"
import { CarController } from "@chat/car.controller"
import { PrismaService } from "@common/database/prisma.service"
import { CarsService } from "@chat/car.service"
import { ConfigModule } from "@nestjs/config"
import { RmqModule } from "@common/rmq/rmq.module"
import { STATS_SERVICE } from "@common/constants"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_CHAT_QUEUE: Joi.string().required(),
                RABBIT_MQ_STATS_QUEUE: Joi.string().required(),
                DATABASE_URL: Joi.string().required()
            }),
            envFilePath: "apps/chat_server/.env"
        }),
        RmqModule.register({
            name: STATS_SERVICE
        })
    ],
    controllers: [CarController],
    providers: [PrismaService, CarsService]
})
export class AppModule {}
