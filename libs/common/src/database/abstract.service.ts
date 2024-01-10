import { Logger, Type } from "@nestjs/common"
import { last, isEmpty } from "lodash"
import { PrismaService } from "./prisma.service"
import { PaginatedArgs, Node, PaginatedType } from "@common/graphql/pagination"
import { Prisma } from "@prisma/client"

export abstract class AbstractService<T extends Node> {
    protected abstract readonly logger: Logger

    constructor(protected prismaService: PrismaService) {}

    async page(
        args: PaginatedArgs,
        modelName: Prisma.ModelName,
        where?: any
    ): Promise<PaginatedType<T>> {
        const name = modelName.toLowerCase()
        const take = args.first > 0 ? args.first + 1 : args.first - 1
        const cars: T[] = args.after
            ? await this.prismaService[name].findMany({
                  take: take,
                  skip: 1,
                  cursor: {
                      id: args.after
                  },
                  where: where
              })
            : await this.prismaService[name].findMany({
                  take: take,
                  where: where
              })

        const totalCount = await this.prismaService[name].count({
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
