import { Inject, Injectable } from "@nestjs/common"
import { PostPage } from "./types"
import { last, isEmpty } from "lodash"
import { PostArgs } from "./types/all.args"
import { Prisma } from "@prisma/client"
import { PrismaService } from "src/lib/prisma.service"

@Injectable()
export class PostService {
    constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

    async postsPage(
        args: PostArgs,
        where?: Prisma.PostWhereInput
    ): Promise<PostPage> {
        const take = args.first > 0 ? args.first + 1 : args.first - 1
        const posts = args.after
            ? await this.prismaService.post.findMany({
                  take: take,
                  skip: 1,
                  cursor: {
                      id: args.after
                  },
                  where: where
              })
            : await this.prismaService.post.findMany({
                  take: take,
                  where: where
              })

        const totalCount = await this.prismaService.post.count({
            where: where
        })

        if (!isEmpty(posts)) {
            const hasNext = posts.length > args.first
            if (hasNext) posts.pop()

            const endCursor = last(posts).id

            return {
                pageInfo: {
                    endCursor: endCursor,
                    hasNextPage: hasNext
                },
                nodes: posts,
                edges: posts.map((post) => ({
                    cursor: post.id,
                    node: post
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
