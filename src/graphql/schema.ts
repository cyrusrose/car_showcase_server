import { builder } from "./builder"
import { writeFileSync } from "fs"
import { printSchema, lexicographicSortSchema } from "graphql"
import { resolve } from "path"
import "./types"

const schema = builder.toSchema()

export default schema

const schemaAsString = printSchema(lexicographicSortSchema(schema))
const path = resolve(__dirname, "../generated/schema.graphql")
writeFileSync(path, schemaAsString)
