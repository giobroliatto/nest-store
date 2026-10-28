<div align="center">

<img src="docs/icon.svg" width="72" alt="nest-store logo" />

# nest-store

**E-commerce REST API built with NestJS, focused on modular architecture and declarative validation.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

</div>

**English** · [Português](README.pt-BR.md)

> [!NOTE]
> A study project for learning NestJS. Data is kept in memory (no database yet), so everything is lost when the server restarts.

---

## About

The API exposes the first two resources of an online store, **users** and **products**, and serves as a playground for NestJS's core concepts: modules, controllers, providers, dependency injection and validation with DTOs.

## Technical highlights

- **One module per domain:** `UserModule` and `ProductModule` each own their controller and repository, and `AppModule` only composes them.
- **Global `ValidationPipe`** with `whitelist` and `forbidNonWhitelisted`: unknown fields are rejected with a 400 before reaching the controller, and `transform` turns the body into an instance of the DTO.
- **Nested validation:** a product carries lists of `features` and `images`, validated item by item with `@ValidateNested` and `@Type` from `class-transformer`.
- **Custom async validator with dependency injection:** `@IsEmailUnique` is a `class-validator` decorator that queries `UserRepository` to block duplicate e-mails. To let the validator receive the repository through Nest's container, `main.ts` calls `useContainer(app.select(AppModule))`.

## Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/users` | Creates a user (`username`, unique `email`, `password` with at least 6 characters) |
| `GET` | `/users` | Lists users |
| `POST` | `/products` | Creates a product |
| `GET` | `/products` | Lists products |

<details>
<summary><strong>Example product payload</strong></summary>

```json
{
  "name": "Mechanical keyboard",
  "value": 349.9,
  "amount": 12,
  "description": "ABNT2 mechanical keyboard with brown switches.",
  "category": "Peripherals",
  "features": [
    { "name": "Switch", "description": "Brown, tactile" }
  ],
  "images": [
    { "url": "https://example.com/keyboard.png", "description": "Front view" }
  ]
}
```

</details>

## Running locally

Requirements: Node.js 18+.

```bash
git clone https://github.com/giobroliatto/nest-store.git
cd nest-store
npm install
npm run start:dev
```

The API runs at http://localhost:3000.

## Next steps

- [ ] Persistence with a real database (TypeORM + PostgreSQL)
- [ ] Response DTOs, so the password is never returned
- [ ] Password hashing
- [ ] Update and delete routes
- [ ] Unit and e2e tests

## Structure

```
src/
├── main.ts                  # Bootstrap, global ValidationPipe and class-validator container
├── app.module.ts
├── user/
│   ├── dto/                 # CreateUserDto
│   ├── validation/          # @IsEmailUnique (async validator)
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.repository.ts   # In-memory storage
└── product/
    ├── dto/                 # CreateProductDto, features and images
    ├── product.controller.ts
    ├── product.module.ts
    └── product.repository.ts
```

---

## License

[MIT](LICENSE)

---

## Author

Made by **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
