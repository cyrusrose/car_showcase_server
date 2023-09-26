import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import type PrismaTypes from "@pothos/plugin-prisma/generated"
import prisma from "../lib/prisma"
import { DateTimeResolver } from "graphql-scalars"

type DateTime = {
    Input: Date
    Output: Date
}

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes
    Context: {}
    Scalars: {
        DateTime: DateTime
    }
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma
    }
})

builder.queryType({})
builder.mutationType({})

builder.addScalarType("DateTime", DateTimeResolver, {})
