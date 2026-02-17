# Desafio Dev Fullstack

Aplicação fullstack para upload, processamento e análise de contas de energia elétrica em PDF, com extração de dados via serviço externo, persistência em banco relacional e dashboard de visualização.

---

## 🧱 Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js 22 (Alpine) |
| Backend | NestJS |
| Frontend | Next.js (React) |
| ORM | Prisma 7 |
| Banco de Dados | MySQL 8 |
| Estilização | TailwindCSS |
| Documentação | Swagger (OpenAPI 3) |
| Testes | Jest (com Mocks) |
| Infra | Docker |

---

## 🚀 Como Iniciar o Projeto

Certifique-se de estar na raiz do projeto (`~/desafio-dev-fullstack`) antes de executar qualquer comando.

### 🐧 Método Recomendado (Linux)

```bash
make build
```

### 🪟 Método Manual (Windows ou fallback)

**1.** Crie o arquivo de variáveis de ambiente (veja a seção abaixo):

```
backend/.env
```

**2.** Suba os containers na raiz do projeto:

```bash
docker compose up -d --build
```

---

## ⚙️ Variáveis de Ambiente

Crie o arquivo `.env` **obrigatoriamente dentro da pasta `/backend`** com o seguinte conteúdo:

```env
# Conexão do Prisma (host deve ser 'mysql' para o Docker)
DATABASE_URL="mysql://root:senha@mysql:3306/desafiobd"

# Configurações de API e CORS
FRONTEND_URL="http://localhost:3000"
PORT=3333

# Credenciais do Banco (Docker Compose)
MYSQL_ROOT_PASSWORD=senha
MYSQL_DATABASE=desafiobd
```

---

## 📂 Estrutura de Pastas

```
desafio-dev-fullstack/
├── backend/
│   └── .env          ← arquivo deve estar aqui
├── conta-de-energia/
├── frontend/
├── docker-compose.yml
└── Makefile
```

---

## 🧪 Testes e Acessos

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:3333 |
| Swagger (Documentação) | http://localhost:3333/api |

Use o Swagger para testar endpoints, validar schemas e realizar uploads de PDF diretamente pelo navegador.

**Rodar testes unitários** (dentro do diretório `/backend`):

```bash
npm run test
```

> Os testes utilizam **Mocks com Jest** e não dependem do banco de dados estar ativo.

---

## 🧠 Decisões Técnicas e Arquitetura

### 🔄 Orquestração de múltiplos arquivos

O serviço externo `magic-pdf` aceita apenas um arquivo por requisição (`file`). Porém, o requisito do desafio prevê que o usuário possa submeter **uma ou mais contas** simultaneamente.

**Solução:** O `SimulationsController` recebe um array de arquivos (`files`). O `SimulationsService` dispara múltiplas requisições em **paralelo** para o serviço de decodificação e consolida os resultados em um único `Lead` antes de persistir — garantindo uma UX superior sem quebrar o contrato da integração externa.

### 🛡️ Validação e regras de negócio

- **Class Validator:** valida formatos de e-mail e obrigatoriedade de campos no DTO.
- **Lógica de domínio:** o backend valida se cada unidade decodificada possui exatamente os **12 meses de histórico** exigidos antes de persistir. Erros são tratados de forma centralizada via `AllExceptionsFilter`, com mensagens claras para o cliente.

### 🏗️ Arquitetura modular (NestJS)

Os módulos foram desenhados para ter responsabilidades isoladas:

- `simulations` — core do negócio
- `shared/magic-pdf` — integração com o serviço externo, desacoplada para facilitar troca de provedor no futuro
- `core/database` — instância centralizada do Prisma

### 🐳 Docker e compatibilidade Alpine + Prisma

A imagem **Node 22 Alpine** foi escolhida pela leveza. Para contornar incompatibilidades entre o Alpine e o engine padrão do Prisma com MySQL 8, foi utilizado o `@prisma/adapter-mariadb`, garantindo o handshake entre containers sem falhas de segmentação.

### 📄 Descarte de arquivos PDF

Conforme o enunciado do desafio, os arquivos PDF **não são persistidos**. O backend processa o conteúdo em memória, extrai os dados estruturados e descarta o arquivo — sem armazenamento em disco ou banco.

---

## 🛠️ Solução de Problemas

### Portas em uso (`Error: address already in use`)

Identifique o processo que está ocupando a porta:

```bash
sudo lsof -i :3000   # substitua pelo número da porta com erro
```

Encerre o processo:

```bash
sudo kill -9 <PID_DO_PROCESSO>
```

> Verifique se há uma instância local do MySQL ou outro projeto Node rodando no sistema.

### `make: command not found`

Certifique-se de estar executando o comando na **raiz** `/desafio-dev-fullstack`, e não dentro de `/backend` ou `/frontend`.