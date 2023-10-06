import "reflect-metadata"
import { ObjectType, Field, Int, ID } from "@nestjs/graphql"
import { IsEmail } from "class-validator"
import { PostPage } from "./post.model"

@ObjectType()
export class User {
    @Field((type) => ID)
    id: string
    @IsEmail()
    email: string
    name?: string | null
    posts: PostPage
}
