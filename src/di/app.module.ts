import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { SchemaModule } from "./schema.module"
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/generated/schema.graphql"),
            buildSchemaOptions: { dateScalarMode: "timestamp" },
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()]
        }),
        SchemaModule
    ]
})
export class AppModule {}
