import { Resolver, Query, Args } from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Car, CarPage } from "./car.model"
import { FeedArgs } from "./car.args"
import { CarsService } from "./car.service"

@Resolver(Car)
export class CarResolver {
    constructor(@Inject(CarsService) private carService: CarsService) {}

    @Query(() => CarPage)
    async feed(@Args() args: FeedArgs) {
        return this.carService.page(args)
    }

    @Query(() => [Car])
    async all() {
        return this.carService.all()
    }
}
