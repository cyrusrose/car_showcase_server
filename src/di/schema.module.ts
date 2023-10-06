import { Module } from "@nestjs/common"
import { PostResolver } from "../graphql/post.resolver"
import { UserResolver } from "../graphql/user.resolver"
import { PrismaService } from "../lib/prisma.service"
import { PostService } from "src/graphql/post.service"

@Module({
    providers: [UserResolver, PostResolver, PrismaService, PostService]
})
export class SchemaModule {}
