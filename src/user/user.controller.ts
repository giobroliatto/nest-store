import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {}
    
    @Post()
    async create(@Body() data) {
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