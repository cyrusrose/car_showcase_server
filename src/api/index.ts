import { Prisma, PrismaClient } from "@prisma/client"
import express from "express"
import { createYoga } from "graphql-yoga"
import schema from "../graphql/schema"

const app = express()

const yoga = createYoga({
    graphqlEndpoint: "/graphql",
    schema,
    context: (req) => {
        return {
            req
        }
    }
})

app.use(yoga.graphqlEndpoint, yoga)
app.use(express.json())

const server = app.listen(3000, () => {
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
})
