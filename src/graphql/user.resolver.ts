import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Root
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Post, User } from "./types"
import { PrismaService } from "../lib/prisma.service"
import { PostArgs, UserCreateInput, UserView } from "./types/all.args"
import { PostService } from "./post.service"

@Resolver(User)
export class UserResolver {
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService,
        @Inject(PostService) private postService: PostService
    ) {}

    @ResolveField()
    async posts(@Root() user: User, @Args() args: PostArgs) {
        return this.postService.postsPage(args, {
            authorId: user.id
        })
    }

    @Mutation(() => UserView)
    async signupUser(@Args("data") data: UserCreateInput): Promise<UserView> {
        const postData = data.posts?.map((post) => ({
            title: post.title,
            content: post.content || undefined
        }))

        return this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name,
                posts: {
                    create: postData
                }
            }
        })
    }

    @Query(() => [User], { nullable: true })
    async allUsers() {
        return this.prismaService.user.findMany()
    }
}
