import { PrismaService } from "@common/database/prisma.service"
import { MakeRequest } from "@common/rmq"
import { Inject, Injectable, Logger } from "@nestjs/common"

@Injectable()
export class StatisticsService {
    readonly logger = new Logger(StatisticsService.name)

    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

    async make({ make }: MakeRequest) {
        const stats = await this.prismaService.carStats.upsert({
            create: {
                make,
                count: 1
            },
            where: {
                make
            },
            update: {
                make,
                count: {
                    increment: 1
                }
            }
        })
        this.logger.log("here " + JSON.stringify(stats))

        return stats
    }
}
