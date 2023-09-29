import { Module } from "@nestjs/common"
import { PostResolver } from "../graphql/post.resolver"
import { UserResolver } from "../graphql/user.resolver"
import { PrismaService } from "./prisma.service"

@Module({
    providers: [UserResolver, PostResolver, PrismaService]
})
export class SchemaModule {}
