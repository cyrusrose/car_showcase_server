import "reflect-metadata"
import { ObjectType, Field, ID, Int } from "@nestjs/graphql"
import { User } from "./user.model"
import { Paginated } from "../../lib/pagination"

@ObjectType()
export class Post {
    @Field(() => ID)
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    content?: string
    published?: boolean
    @Field(() => Int)
    viewCount: number
    author?: User
}

@ObjectType()
export class PostPage extends Paginated(Post) {}
