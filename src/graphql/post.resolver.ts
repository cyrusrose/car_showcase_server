import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Root,
    Context,
    Int,
    InputType,
    Field,
    registerEnumType
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Post, User } from "./types"
import { PrismaService } from "../di/prisma.service"

@InputType()
export class PostCreateInput {
    @Field()
    title: string

    @Field({ nullable: true })
    content: string | null

    @Field({ defaultValue: false })
    published: boolean
}

@Resolver(Post)
export class PostResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
    postById(@Args("id") id: number) {
        return this.prismaService.post.findUnique({
            where: { id }
        })
    }

    @Query(() => [Post])
    feed(@Args("searchString", { nullable: true }) searchString: string) {
        const or = searchString
            ? {
                  OR: [
                      { title: { contains: searchString } },
                      { content: { contains: searchString } }
                  ]
              }
            : {}

        return this.prismaService.post.findMany({
            where: {
                ...or
            }
        })
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
    async togglePublishPost(@Args("id") id: number) {
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
