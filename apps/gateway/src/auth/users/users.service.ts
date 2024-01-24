import {
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException
} from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { CreateUserRequest } from "./dto/create-user.request"
import { User } from "@prisma/client"
import { PrismaService } from "@common/database/prisma.service"

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    async createUser(request: CreateUserRequest) {
        await this.validateCreateUserRequest(request)
        const user = await this.prismaService.user.create({
            data: {
                ...request,
                password: await bcrypt.hash(request.password, 10)
            }
        })
        return user
    }

    private async validateCreateUserRequest(request: CreateUserRequest) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: request.email
            }
        })

        if (user) {
            throw new UnprocessableEntityException("Email already exists.")
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.prismaService.user.findUniqueOrThrow({
            where: { email }
        })
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if (!passwordIsValid) {
            throw new UnauthorizedException("Credentials are not valid.")
        }
        return user
    }

    async getUser(id: string) {
        return this.prismaService.user.findUniqueOrThrow({
            where: {
                id
            }
        })
    }
}
