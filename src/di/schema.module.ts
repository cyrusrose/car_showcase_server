import { Module } from "@nestjs/common"
import { CarResolver } from "../graphql/car.resolver"
import { PrismaService } from "../lib/prisma.service"
import { CarsService } from "src/graphql/car.service"

@Module({
    providers: [CarResolver, PrismaService, CarsService]
})
export class SchemaModule {}
