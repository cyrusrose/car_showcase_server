import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Args,
    Context,
    ResolveField,
    Root,
    InputType,
    Field
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Post, User } from "./types"
import { PrismaService } from "../di/prisma.service"
import { PostCreateInput } from "./post.resolver"

@InputType()
class UserCreateInput {
    @Field()
    email: string

    @Field({ nullable: true })
    name: string

    @Field(() => [PostCreateInput], { nullable: true })
    posts: [PostCreateInput]
}

@Resolver(User)
export class UserResolver {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

    @ResolveField()
    async posts(@Root() user: User): Promise<Post[]> {
        return this.prismaService.user
            .findUnique({
                where: {
                    id: user.id
                }
            })
            .posts()
    }

    @Mutation(() => User)
    async signupUser(@Args("data") data: UserCreateInput): Promise<User> {
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
