import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller('/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) {}

    @Post()
    async create(@Body() data: CreateProductDto) {
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