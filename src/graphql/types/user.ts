import { builder } from "../builder"
import prisma from "../../lib/prisma"

builder.prismaObject("User", {
    fields: (t) => ({
        id: t.exposeInt("id"),
        name: t.exposeString("name", { nullable: true }),
        email: t.exposeString("email"),
        posts: t.relation("posts", { nullable: true })
    })
})

builder.queryField("findByEmail", (t) =>
    t.prismaField({
        type: "User",
        nullable: true,
        args: {
            email: t.arg.string({ required: true })
        },
        resolve: (query, _, args) =>
            prisma.user.findUnique({
                ...query,
                where: { email: args.email }
            })
    })
)
