import { Module } from "@nestjs/common"
import { StatisticsController } from "./statistics.controller"
import { StatisticsService } from "./statistics.service"
import * as Joi from "joi"
import { PrismaService } from "@common/database/prisma.service"
import { ConfigModule } from "@nestjs/config"
import { RmqModule } from "@common/rmq/rmq.module"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_STATS_QUEUE: Joi.string().required(),
                DATABASE_URL: Joi.string().required()
            }),
            envFilePath: "apps/statistics/.env"
        }),
        RmqModule
    ],
    controllers: [StatisticsController],
    providers: [PrismaService, StatisticsService]
})
export class AppModule {}
