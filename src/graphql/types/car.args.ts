import { ArgsType, Field, Int, ID } from "@nestjs/graphql"
import { NotEquals } from "class-validator"

@ArgsType()
export class CarArgs {
    @Field((type) => Int)
    @NotEquals(0)
    first: number
    @Field((type) => ID)
    after?: string
}

@ArgsType()
export class FeedArgs extends CarArgs {
    make?: string
    model?: string
    fuel?: string
    @Field((type) => Int)
    year?: number
}
