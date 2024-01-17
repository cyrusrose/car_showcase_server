import { CarPaginatedArgs } from "@common/rmq"
import { ArgsType, Field, Int, ID } from "@nestjs/graphql"
import { NotEquals } from "class-validator"

@ArgsType()
export class FeedArgs implements CarPaginatedArgs {
    @Field(() => Int)
    @NotEquals(0)
    first: number
    @Field(() => ID)
    after?: string
    make?: string
    model?: string
    fuel?: string
    @Field(() => Int)
    year?: number
}
