import { PaginatedArgs } from "@common/graphql/pagination"

export interface CarPaginatedArgs extends PaginatedArgs {
    make?: string
    model?: string
    fuel?: string
    year?: number
}
