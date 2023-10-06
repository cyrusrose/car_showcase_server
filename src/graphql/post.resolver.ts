import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Root,
    ID
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Post, PostPage, User } from "./types"
import { PrismaService } from "../lib/prisma.service"
import { last, isEmpty } from "lodash"
import { FeedArgs, PostCreateInput } from "./types/all.args"
import { PostService } from "./post.service"
import { Prisma } from "@prisma/client"

@Resolver(Post)
export class PostResolver {
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService,
        @Inject(PostService) private postService: PostService
    ) {}

    @ResolveField(() => User, { nullable: true })
    author(@Root() post: Post) {
        return this.prismaService.post
            .findUnique({
                where: {
                    id: post.id
                }
            })
            .author()
    }

    @Query(() => Post, { nullable: true })
    postById(@Args("id", { type: () => ID }) id: string) {
        return this.prismaService.post.findUnique({
            where: { id }
        })
    }

    @Query(() => PostPage)
    async feed(@Args() args: FeedArgs) {
        const where: Prisma.PostWhereInput = args.searchString
            ? {
                  OR: [
                      { title: { contains: args.searchString } },
                      { content: { contains: args.searchString } }
                  ]
              }
            : undefined

        return this.postService.postsPage(args, where)
    }

    @Mutation(() => Post)
    createDraft(
        @Args("data") data: PostCreateInput,
        @Args("authorEmail") authorEmail: string
    ) {
        return this.prismaService.post.create({
            data: {
                title: data.title,
                content: data.content,
                author: {
                    connect: { email: authorEmail }
                }
            }
        })
    }

    @Mutation(() => Post, { nullable: true })
    async togglePublishPost(@Args("id", { type: () => ID }) id: string) {
        const post = await this.prismaService.post.findUnique({
            where: { id },
            select: {
                id: true,
                published: true
            }
        })

        return this.prismaService.post.update({
            where: { id: id },
            data: { published: !post?.published }
        })
    }
}
