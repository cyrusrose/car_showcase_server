import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { RmqOptions } from "@nestjs/microservices"
import { RmqService } from "@common/rmq/rmq.service"
import { STATS_SERVICE } from "@common/constants"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const rmqService = app.get(RmqService)
    app.connectMicroservice<RmqOptions>(
        rmqService.getOptions(STATS_SERVICE, true)
    )
    app.enableShutdownHooks()
    app.useGlobalPipes(new ValidationPipe())
    app.startAllMicroservices()
}

bootstrap()
