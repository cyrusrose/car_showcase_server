import { Field, ObjectType, Int } from "@nestjs/graphql"
import { Type } from "@nestjs/common"

export interface EdgeType<T> {
    cursor: string
    node: T
}

export interface PageInfoType {
    endCursor: string
    hasNextPage: boolean
}

export interface PaginatedType<T> {
    edges?: EdgeType<T>[]
    nodes?: T[]
    totalCount: number
    pageInfo: PageInfoType
}

export function Paginated<T>(classRef: Type<T>) {
    @ObjectType(`${classRef.name}Edge`)
    abstract class Edge implements EdgeType<T> {
        @Field()
        cursor: string

        @Field((type) => classRef)
        node: T
    }

    @ObjectType()
    abstract class PageInfo implements PageInfoType {
        @Field({ nullable: true })
        endCursor: string

        @Field()
        hasNextPage: boolean
    }

    @ObjectType({ isAbstract: true })
    abstract class Page implements PaginatedType<T> {
        @Field((type) => [Edge], { nullable: true })
        edges?: Edge[]

        @Field((type) => [classRef])
        nodes?: T[]

        @Field((type) => Int)
        totalCount: number

        @Field((type) => PageInfo)
        pageInfo: PageInfoType
    }
    return Page as Type<PaginatedType<T>>
}
