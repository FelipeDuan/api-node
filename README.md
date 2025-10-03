# API Node (Fastify + TypeScript + Drizzle)

API em Node.js/TypeScript com **Fastify**, **Zod** (type-provider), **Drizzle ORM** (Postgres), build com **tsup**, testes com **Vitest** e ambiente Docker para desenvolvimento.

> **Stack**: Node 22+, TypeScript, Fastify, Zod, Drizzle ORM (PostgreSQL), tsup, Vitest, Docker/Compose.

---

## ✨ Principais recursos

- ⚡ **Fastify** com tipagem end-to-end via **Zod** (type-provider).
- 🗃️ **Drizzle ORM** com migrações versionadas em `drizzle/`.
- 🧪 **Vitest** para unit/integration tests.
- 🐳 **Docker Compose** para subir banco Postgres (+ opcional cliente).
- 📦 **Build** rápido com **tsup** (ESM/CJS).
- 🔐 Variáveis de ambiente via `.env` (exemplo em `.env.exemple`).

---

## 🗺️ Arquitetura da Solução

```mermaid
flowchart LR
    A[👤 Cliente] -->|HTTP Request| B[⚡ Fastify API]
    B -->|Validação com Zod| C[🧩 Rotas & Serviços]
    C --> D[(🗃️ Drizzle ORM)]
    D -->|SQL Queries| E[(🐘 PostgreSQL DB)]

    subgraph Infraestrutura
      E
    end
```

Explicação:  
- O **Cliente** envia requisições HTTP para a **API (Fastify)**.  
- O **Fastify** valida entradas/saídas usando **Zod**.  
- As **Rotas & Serviços** processam regras de negócio e chamam o **Drizzle ORM**.  
- O **Drizzle ORM** gera queries SQL e se conecta ao **Postgres**, rodando em Docker ou Neon.

---

## 🗂️ Estrutura do projeto (resumo)

```
api-node/
├─ docker/
│  └─ (scripts/config do ambiente Docker)
├─ drizzle/
│  ├─ 0000_*.sql          # migrações geradas pelo drizzle-kit
│  └─ meta/*              # metadados das migrações
├─ src/
│  ├─ database/
│  │  ├─ client.ts        # conexão Drizzle/pg
│  │  └─ schema.ts        # tabelas e relations (ex.: courses, enrollments)
│  ├─ routes/
│  │  ├─ get-courses.ts   # exemplo de rota GET /courses com paginação/filtros
│  │  └─ hooks/           # ex.: check-user-role.ts (hooks/guards de rota)
│  ├─ utils/              # helpers (ex.: auth, errors, pagination)
│  ├─ server.ts           # bootstrap do Fastify e registro das rotas
│  └─ index.ts            # entrypoint
├─ .dockerignore
├─ .env.exemple
├─ .gitignore
├─ Dockerfile
├─ docker-compose.yml
├─ drizzle.config.ts
├─ package.json
├─ tsconfig.json
├─ tsconfig.build.json
└─ vitest.config.ts
```

---

## 🚀 Começando

### 1) Pré-requisitos

- **Node.js 22+**
- **pnpm** (ou npm/yarn)
- **Docker** e **Docker Compose** (opcional, recomendado para DB local)

### 2) Variáveis de ambiente

Copie o arquivo de exemplo e ajuste:

```bash
cp .env.exemple .env
```

Variáveis típicas (ajuste conforme o seu `.env.exemple`):

```env
# Banco de dados (Postgres)
DATABASE_URL="postgres://postgres:postgres@localhost:5432/appdb"

# Porta da API
PORT=3333

# (Outras que você usa, p.ex. JWT_SECRET, NODE_ENV, etc.)
```

### 3) Subindo banco com Docker (dev)

```bash
docker compose up -d
```

### 4) Instalar deps

```bash
pnpm install
```

### 5) Migrar o banco (Drizzle)

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

### 6) Popular o banco (Drizzle)

```bash
pnpm db:seed
```

### 7) Rodar em desenvolvimento

```bash
pnpm dev
```

### 8) Build & start (produção)

```bash
pnpm build
pnpm start
```

### Outros comandos Docker

```bash
docker compose stop  # Interrompe a execução dos containers, mas mantém a instância criada
docker compose down  # Para e remove completamente os containers, redes e volumes (se especificado)
```

Dica: Use **stop** quando quiser apenas pausar temporariamente e **down** quando quiser encerrar tudo e liberar os recursos.

---

## 🔌 Rotas (exemplos)

### `GET /courses`

- **Query params** (exemplo):  
  - `q`, `page`, `limit`, `order`
- **Resposta**: lista paginada com `data`, `page`, `limit`, `total`.

---

## 🧩 Banco de dados (Drizzle)

- Definições em `src/database/schema.ts`.
- Migrações em `drizzle/`.

Fluxo:
1. Editar `schema.ts`
2. `pnpm db:generate`
3. `pnpm db:migrate`

---

## 🧪 Testes (Vitest)

```bash
pnpm test
```

---

## 🏗️ Build (tsup)

Gera saída em `dist/`.

---

## 🐳 Deploy

Exemplo Render/Neon:
- `DATABASE_URL` deve usar **connection pooling**.
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`

---

## 🔒 Boas práticas

- Não versionar `.env`, `.env.test`, `coverage/`.
- Usar **Conventional Commits**.
- Seguir princípios KISS, YAGNI, SOLID e Clean Code.

---

## 🧰 Scripts úteis (exemplos)

```jsonc
{
  "scripts": {
    "pretest": "dotenv -e .env.test drizzle-kit migrate",
    "test": "dotenv -e .env.test vitest run --coverage",
    "build": "tsup src/index.ts --out-dir dist --dts",
    "start": "node dist/server.js",
    "dev": "tsx watch -r dotenv/config src/server.ts",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx -r dotenv/config src/database/seed.ts"
  }
}
```

---

## 📬 Contato

- Autor: **Felipe Duan**
- E-mail: [felipeduan1@gmail.com](mailto:felipeduan1@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/felipe-duan](https://www.linkedin.com/in/felipe-duan/)
