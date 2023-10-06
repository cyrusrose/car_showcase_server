import { NestFactory } from "@nestjs/core"
import { AppModule } from "./di/app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableShutdownHooks()
    app.useGlobalPipes(new ValidationPipe())

    console.log(process.env.NODE_ENV)
    await app.listen(3000, () => {
        console.log(`
🚀 Server ready at: http://localhost:3000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-nestjs#using-the-graphql-api
`)
    })
}
bootstrap()
