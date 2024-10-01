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

    async isEmailRegistered(email: string) {
        const possibleUser = this.users.find(
            user => user.email === email
        );

        return possibleUser !== undefined;
    }
}