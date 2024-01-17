import { PaginatedArgs, PaginatedType, Node } from "@common/graphql/pagination"
import { Car } from "@prisma/client"

export interface CarPaginatedArgs extends PaginatedArgs {
    make?: string
    model?: string
    fuel?: string
    year?: number
}

export interface MakeRequest {
    make: string
}

export interface MakeRespond {
    make: string
    count: number
}

export interface IPaginatedType<T extends Node> extends PaginatedType<T> {
    makeCount?: MakeRespond
}

export type CarPaginatedType = IPaginatedType<Car>
