import { Controller } from "@nestjs/common"
import { StatisticsService } from "./statistics.service"
import { EventPattern, Payload } from "@nestjs/microservices"
import { MakeRequest } from "@common/rmq"

@Controller()
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @EventPattern("make")
    async handleMake(@Payload() data: MakeRequest) {
        return this.statisticsService.make(data)
    }
}
