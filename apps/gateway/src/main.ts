import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { schemaProperty } from "./app.module"
import { RmqOptions } from "@nestjs/microservices"
import { RmqService } from "@common/rmq/rmq.service"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableShutdownHooks()
    app.useGlobalPipes(new ValidationPipe())

    const configService = app.get<ConfigService>(ConfigService)
    const PORT = configService.get(schemaProperty("PORT"))
    // app.enableCors({
    //     credentials: true,
    //     origin: [
    //         `http://localhost:${PORT}/graphql`,
    //         "http://localhost:${PORT2}"
    //     ]
    // })

    await app.listen(PORT, () => {
        console.log(`
🚀 Server ready at: http://localhost:${PORT}/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-nestjs#using-the-graphql-api
`)
    })
}
bootstrap()
