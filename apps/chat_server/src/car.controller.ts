import { Controller, Inject } from "@nestjs/common"
import { CarsService } from "./car.service"
import { Car } from "@prisma/client"
import { CarPaginatedArgs } from "@common/graphql/car.args"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { PaginatedType } from "@common/graphql/pagination"

@Controller()
export class CarController {
    constructor(@Inject(CarsService) private carService: CarsService) {}

    @MessagePattern("car_feed")
    async carFeed(
        @Payload() args: CarPaginatedArgs
    ): Promise<PaginatedType<Car>> {
        return this.carService.page(args)
    }

    @MessagePattern("car_all")
    async carAll(): Promise<Car[]> {
        return this.carService.all()
    }
}
