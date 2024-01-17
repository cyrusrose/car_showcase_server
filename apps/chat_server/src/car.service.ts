import { Inject, Injectable, Logger } from "@nestjs/common"
import { Prisma, Car } from "@prisma/client"
import { PrismaService } from "@common/database/prisma.service"
import { AbstractService } from "@common/database/abstract.service"
import { CarPaginatedArgs, MakeRequest, CarPaginatedType } from "@common/rmq"
import { PaginatedType } from "@common/graphql/pagination"
import { STATS_SERVICE } from "@common/constants"
import { ClientProxy } from "@nestjs/microservices"
import { lastValueFrom } from "rxjs"

@Injectable()
export class CarsService extends AbstractService<Car> {
    protected readonly logger = new Logger(CarsService.name)

    constructor(
        @Inject(PrismaService) prismaService: PrismaService,
        @Inject(STATS_SERVICE) private statsClient: ClientProxy
    ) {
        super(prismaService)
    }

    async page(args: CarPaginatedArgs): Promise<CarPaginatedType> {
        const where: Prisma.CarWhereInput = {
            make: args.make || undefined,
            model: args.model || undefined,
            fuel_type: args.fuel || undefined,
            year: args.year || undefined
        }

        const cars: CarPaginatedType = await super.page(args, "Car", where)

        if (args.make || undefined) {
            this.statsClient.emit<void, MakeRequest>("make", {
                make: args.make
            })

            cars.makeCount = await this.prismaService.carStats.findUnique({
                where: {
                    make: args.make
                }
            })
        }
        return cars
    }

    async all(): Promise<Car[]> {
        return this.prismaService.car.findMany({ take: 3 })
    }
}
