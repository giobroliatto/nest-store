import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { IsEmailUniqueValidator } from "./validation/is-email-unique.validator";

@Module({
    controllers: [UserController],
    providers: [UserRepository, IsEmailUniqueValidator]
})
export class UserModule {}