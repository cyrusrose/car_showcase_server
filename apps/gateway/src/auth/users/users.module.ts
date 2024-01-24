import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { PrismaModule } from "@common/database/prisma.module"

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
