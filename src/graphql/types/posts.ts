import { builder } from "../builder"

builder.prismaObject("Post", {
    fields: (t) => ({
        id: t.exposeInt("id"),
        createdAt: t.expose("createdAt", { type: "DateTime" }),
        updatedAt: t.expose("updatedAt", { type: "DateTime" }),
        title: t.exposeString("title"),
        published: t.exposeBoolean("published"),
        content: t.exposeString("content", { nullable: true }),
        viewCount: t.exposeInt("viewCount"),
        author: t.relation("author")
    })
})
