import "reflect-metadata"
import { ObjectType, Field, ID, Int } from "@nestjs/graphql"
import { User } from "./user.model"

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    content?: string
    published?: boolean
    @Field(() => Int)
    viewCount: number
    author?: User
}
