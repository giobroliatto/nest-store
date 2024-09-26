import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

@Controller('/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) {}

    @Post()
    async create(@Body() data) {
        this.productRepository.create(data);

        return {
            message: 'product created',
            data: data
        }
    }

    @Get()
    async getAll() {
        return this.productRepository.getAll();
    }
}