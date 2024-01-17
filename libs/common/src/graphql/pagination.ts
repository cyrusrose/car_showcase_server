import { Field, ObjectType, Int } from "@nestjs/graphql"
import { Type } from "@nestjs/common"

export interface Node {
    id: string
}

export interface PaginatedArgs {
    first: number
    after?: string
}

export interface EdgeType<T extends Node> {
    cursor: string
    node: T
}

export interface PageInfoType {
    endCursor: string
    hasNextPage: boolean
}

export interface PaginatedType<T extends Node> {
    edges?: EdgeType<T>[]
    nodes?: T[]
    totalCount: number
    pageInfo: PageInfoType
}

export function Paginated<T extends Node>(classRef: Type<T>) {
    @ObjectType(`${classRef.name}Edge`)
    abstract class Edge implements EdgeType<T> {
        @Field()
        cursor: string

        @Field(() => classRef)
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
        @Field(() => [Edge], { nullable: true })
        edges?: Edge[]

        @Field(() => [classRef])
        nodes?: T[]

        @Field(() => Int)
        totalCount: number

        @Field(() => PageInfo)
        pageInfo: PageInfoType
    }
    return Page as Type<PaginatedType<T>>
}
