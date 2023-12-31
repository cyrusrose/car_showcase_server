import { NestFactory } from "@nestjs/core"
import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory
} from "@nestjs/graphql"
import { writeFileSync } from "fs"
import { printSchema } from "graphql"
import { resolve } from "path"
import { CarResolver } from "./graphql/car.resolver"

// With CLI Plugin
async function generateSchema() {
    console.log("Generating schema...")
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([CarResolver])

    console.log(__dirname)
    writeFileSync(
        resolve(__dirname, "../src/generated/schema.graphql"),
        printSchema(schema)
    )
}

generateSchema()
