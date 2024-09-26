import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private users = [];

    async create(data) {
        this.users.push(data);
    }

    async getAll() {
        return this.users;
    }
}