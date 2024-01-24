import { Resolver, Query, Args } from "@nestjs/graphql"
import { Inject, UseGuards } from "@nestjs/common"
import { Car, CarPage } from "./car.model"
import { FeedArgs } from "./car.args"
import { CarsService } from "./car.service"
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard"

@Resolver(Car)
export class CarResolver {
    constructor(@Inject(CarsService) private carService: CarsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => CarPage)
    async feed(@Args() args: FeedArgs) {
        return this.carService.page(args)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Car])
    async all() {
        return this.carService.all()
    }
}
