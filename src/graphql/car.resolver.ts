import "reflect-metadata"
import {
    Resolver,
    Query,
    Mutation,
    Args,
    ResolveField,
    Root,
    ID
} from "@nestjs/graphql"
import { Inject } from "@nestjs/common"
import { Car, CarPage } from "./types"
import { PrismaService } from "../lib/prisma.service"
import { FeedArgs } from "./types/car.args"
import { CarsService } from "./car.service"
import { Prisma } from "@prisma/client"

@Resolver(Car)
export class CarResolver {
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService,
        @Inject(CarsService) private postService: CarsService
    ) {}

    @Query(() => CarPage)
    async feed(@Args() args: FeedArgs) {
        const { make, fuel, model, year } = args

        const where: Prisma.CarWhereInput = {
            make: make || undefined,
            model: model || undefined,
            fuel_type: fuel || undefined,
            year: year || undefined
        }
        return this.postService.page(args, where)
    }
}
