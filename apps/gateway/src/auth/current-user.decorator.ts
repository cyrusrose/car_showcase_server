import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "@prisma/client"
import { GqlExecutionContext } from "@nestjs/graphql"

export const getCurrentUserByContext = (context: ExecutionContext): User => {
    if (context.getType() === "http") {
        return context.switchToHttp().getRequest().user
    }
    if (context.getType() === "rpc") {
        return context.switchToRpc().getData().user
    }
    if ((context.getType() as any) === "graphql") {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req.user
    }
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context)
)
