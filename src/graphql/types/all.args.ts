import {
    InputType,
    ArgsType,
    Field,
    Int,
    ID,
    PickType,
    ObjectType
} from "@nestjs/graphql"
import { NotEquals } from "class-validator"
import { User } from "./user.model"

@ArgsType()
export class PostArgs {
    @Field((type) => Int)
    @NotEquals(0)
    first: number
    @Field((type) => ID)
    after?: string
}

@ObjectType()
export class UserView extends PickType(User, [
    "id",
    "email",
    "name"
] as const) {}

@ArgsType()
export class FeedArgs extends PostArgs {
    searchString?: string
}

@InputType()
export class PostCreateInput {
    title: string
    content?: string
    published: boolean = false
}

@InputType()
export class UserCreateInput {
    email: string
    name?: string
    posts?: PostCreateInput[]
}
