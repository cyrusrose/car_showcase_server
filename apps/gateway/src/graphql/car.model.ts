import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql"
import { Paginated } from "@common/graphql/pagination"
import { Node } from "@common/graphql/pagination"

@ObjectType()
export class Car implements Node {
    @Field(() => ID)
    id: string
    @Field(() => Int)
    city_mpg: number
    class: string
    @Field(() => Int)
    cylinders?: number
    @Field(() => Int)
    combination_mpg: number
    @Field(() => Float)
    displacement?: number
    drive: string
    fuel_type: string
    @Field(() => Int)
    highway_mpg: number
    make: string
    model: string
    transmission: string
    @Field(() => Int)
    year: number
}

@ObjectType()
export class CarPage extends Paginated(Car) {}
