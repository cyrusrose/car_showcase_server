import { YogaDriver, YogaDriverConfig } from "@graphql-yoga/nestjs"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { PrismaService } from "./prisma.service"
import { PostResolver } from "../graphql/resolvers.post"
import { UserResolver } from "../graphql/resolvers.user"
import { join } from "path"

@Module({
    imports: [
        GraphQLModule.forRoot<YogaDriverConfig>({
            driver: YogaDriver,
            autoSchemaFile: join(process.cwd(), "src/generated/schema.graphql"),
            buildSchemaOptions: { dateScalarMode: "timestamp" }
        })
    ],
    providers: [PrismaService, UserResolver, PostResolver]
})
export class AppModule {}
