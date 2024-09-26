import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    private products = [];

    async create(data) {
        this.products.push(data);
    }

    async getAll() {
        return this.products;
    }
}