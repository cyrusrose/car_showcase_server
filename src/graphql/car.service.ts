import { Inject, Injectable } from "@nestjs/common"
import { last, isEmpty } from "lodash"
import { CarArgs } from "./types/car.args"
import { Prisma } from "@prisma/client"
import { PrismaService } from "src/lib/prisma.service"
import { CarPage } from "./types"

@Injectable()
export class CarsService {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

    async page(args: CarArgs, where?: Prisma.CarWhereInput): Promise<CarPage> {
        const take = args.first > 0 ? args.first + 1 : args.first - 1
        const cars = args.after
            ? await this.prismaService.car.findMany({
                  take: take,
                  skip: 1,
                  cursor: {
                      id: args.after
                  },
                  where: where
              })
            : await this.prismaService.car.findMany({
                  take: take,
                  where: where
              })

        const totalCount = await this.prismaService.car.count({
            where: where
        })

        if (!isEmpty(cars)) {
            const hasNext = cars.length > args.first
            if (hasNext) cars.pop()

            const endCursor = last(cars).id

            return {
                pageInfo: {
                    endCursor: endCursor,
                    hasNextPage: hasNext
                },
                nodes: cars,
                edges: cars.map((car) => ({
                    cursor: car.id,
                    node: car
                })),
                totalCount: totalCount
            }
        } else {
            return {
                pageInfo: {
                    endCursor: null,
                    hasNextPage: false
                },
                totalCount: totalCount
            }
        }
    }
}
