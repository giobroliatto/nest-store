<div align="center">

<img src="docs/icon.svg" width="72" alt="Logo do nest-store" />

# nest-store

**API REST de e-commerce em NestJS, com foco em arquitetura modular e validação declarativa.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green)](LICENSE)

</div>

[English](README.md) · **Português**

> [!NOTE]
> Projeto de estudo para aprender NestJS. Os dados ficam em memória (ainda não há banco de dados), então tudo se perde quando o servidor reinicia.

---

## Sobre

A API expõe os dois primeiros recursos de uma loja virtual, **usuários** e **produtos**, e serve de laboratório para os conceitos centrais do NestJS: módulos, controllers, providers, injeção de dependência e validação com DTOs.

## Destaques técnicos

- **Um módulo por domínio:** `UserModule` e `ProductModule` têm cada um seu controller e seu repositório, e o `AppModule` só os compõe.
- **`ValidationPipe` global** com `whitelist` e `forbidNonWhitelisted`: campos desconhecidos são recusados com 400 antes de chegar no controller, e o `transform` converte o body numa instância do DTO.
- **Validação aninhada:** o produto tem listas de `features` e `images`, validadas item a item com `@ValidateNested` e `@Type` do `class-transformer`.
- **Validador assíncrono customizado com injeção de dependência:** `@IsEmailUnique` é um decorator do `class-validator` que consulta o `UserRepository` para barrar e-mails repetidos. Para o validador receber o repositório pelo container do Nest, o `main.ts` chama `useContainer(app.select(AppModule))`.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/users` | Cria um usuário (`username`, `email` único, `password` com no mínimo 6 caracteres) |
| `GET` | `/users` | Lista os usuários |
| `POST` | `/products` | Cria um produto |
| `GET` | `/products` | Lista os produtos |

<details>
<summary><strong>Exemplo de payload de produto</strong></summary>

```json
{
  "name": "Teclado mecânico",
  "value": 349.9,
  "amount": 12,
  "description": "Teclado mecânico ABNT2 com switches brown.",
  "category": "Periféricos",
  "features": [
    { "name": "Switch", "description": "Brown, tátil" }
  ],
  "images": [
    { "url": "https://example.com/teclado.png", "description": "Vista frontal" }
  ]
}
```

</details>

## Rodando localmente

Pré-requisitos: Node.js 18+.

```bash
git clone https://github.com/giobroliatto/nest-store.git
cd nest-store
npm install
npm run start:dev
```

A API sobe em http://localhost:3000.

## Próximos passos

- [ ] Persistência num banco de verdade (TypeORM + PostgreSQL)
- [ ] DTOs de resposta, para nunca devolver a senha
- [ ] Hash de senha
- [ ] Rotas de edição e remoção
- [ ] Testes unitários e e2e

## Estrutura

```
src/
├── main.ts                  # Bootstrap, ValidationPipe global e container do class-validator
├── app.module.ts
├── user/
│   ├── dto/                 # CreateUserDto
│   ├── validation/          # @IsEmailUnique (validador assíncrono)
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.repository.ts   # Armazenamento em memória
└── product/
    ├── dto/                 # CreateProductDto, features e images
    ├── product.controller.ts
    ├── product.module.ts
    └── product.repository.ts
```

---

## Licença

[MIT](LICENSE)

---

## Autor

Feito por **Giovani Broliatto**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-giobroliatto-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giobroliatto/)
