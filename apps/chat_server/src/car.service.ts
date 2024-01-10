import { Inject, Injectable, Logger } from "@nestjs/common"
import { Prisma, Car } from "@prisma/client"
import { PrismaService } from "@common/database/prisma.service"
import { AbstractService } from "@common/database/abstract.service"
import { CarPaginatedArgs } from "@common/graphql/car.args"
import { PaginatedType } from "@common/graphql/pagination"

@Injectable()
export class CarsService extends AbstractService<Car> {
    protected readonly logger = new Logger(CarsService.name)

    constructor(@Inject(PrismaService) prismaService: PrismaService) {
        super(prismaService)
    }

    async page(args: CarPaginatedArgs): Promise<PaginatedType<Car>> {
        const where: Prisma.CarWhereInput = {
            make: args.make || undefined,
            model: args.model || undefined,
            fuel_type: args.fuel || undefined,
            year: args.year || undefined
        }
        const cars = super.page(args, "Car", where)

        return cars
    }

    async all(): Promise<Car[]> {
        return this.prismaService.car.findMany({ take: 3 })
    }
}
