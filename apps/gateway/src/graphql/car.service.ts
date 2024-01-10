import { CHAT_SERVICE } from "@common/constants"
import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { FeedArgs } from "./car.args"
import { firstValueFrom, lastValueFrom, tap } from "rxjs"
import { Car, CarPage } from "./car.model"
import { CarPaginatedArgs } from "@common/graphql/car.args"

@Injectable()
export class CarsService {
    constructor(@Inject(CHAT_SERVICE) private chatClient: ClientProxy) {}

    async all(): Promise<Car[]> {
        const car = firstValueFrom(this.chatClient.send<Car[]>("car_all", {}))
        return car
    }

    async page(args: FeedArgs): Promise<CarPage> {
        const car = this.chatClient.send<CarPage, CarPaginatedArgs>(
            "car_feed",
            args
        )
        return lastValueFrom(car)
    }
}
