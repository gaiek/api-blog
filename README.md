# API Blog

API RESTful para gerenciamento de artigos e tags de um blog, desenvolvida com Node.js, TypeScript, Express e Prisma.

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Documentação da API](#-documentação-da-api)
- [Testes](#-testes)
- [Comandos Úteis](#-comandos-úteis)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js**
- **Yarn**
- **Docker** e **Docker Compose**
- **Git** 

## 🔧 Instalação

1. **Clone o repositório:**

```bash
git clone <url-do-repositorio>
cd api-blog
```

2. **Instale as dependências:**

```bash
nvm use 
```

```bash
yarn
```

## ⚙️ Configuração

### 2. Iniciar o banco de dados

Inicie o banco de dados PostgreSQL usando Docker Compose:

```bash
docker compose up --build -d
```

### 3. Executar migrações do Prisma

Execute as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

### 4. Gerar o cliente Prisma

Gere o cliente Prisma baseado no schema:

```bash
npx prisma generate
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento

Para executar o projeto em modo de desenvolvimento com hot-reload (usando nodemon):

```bash
yarn dev
```

### Modo Produção

1. **Compile o projeto TypeScript:**

```bash
yarn build
```

Isso irá compilar todos os arquivos TypeScript para JavaScript na pasta `dist/`.

2. **Execute o servidor:**

```bash
yarn start
```

## 📚 Documentação da API

A documentação interativa da API está disponível através do Swagger UI. Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

## 🧪 Testes

Para executar os testes:

```bash
yarn test
```

## 🔍 Comandos Úteis

### Prisma

- `npx prisma studio` - Abre o Prisma Studio (interface visual para o banco de dados)
- `npx prisma migrate dev` - Cria e aplica uma nova migração (desenvolvimento)
- `npx prisma migrate deploy` - Aplica migrações pendentes (produção)
- `npx prisma generate` - Gera o cliente Prisma
- `npx prisma db push` - Sincroniza o schema com o banco sem criar migração

### Docker

- `docker-compose up --build -d` - Inicia os serviços em background
- `docker-compose down` - Para e remove os containers
- `docker-compose logs -f` - Visualiza os logs dos serviços
- `docker-compose ps` - Lista os containers em execução
- `docker-compose restart` - Reinicia os serviços

### Desenvolvimento

- `yarn dev` - Inicia o servidor em modo desenvolvimento
- `yarn build` - Compila o projeto TypeScript
- `yarn start` - Inicia o servidor em modo produção
- `yarn test` - Executa os testes


