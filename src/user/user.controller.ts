import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {}
    
    @Post()
    async create(@Body() data: CreateUserDto) {
        this.userRepository.create(data);

        return {
            message: 'user created',
            data: data
        }
    }

    @Get()
    async getAll() {
        return this.userRepository.getAll();
    }
}