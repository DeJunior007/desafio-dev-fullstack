# Estágio 1: Builder (Permanece igual)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

# Estágio 2: Production runtime
FROM node:22-alpine AS production
WORKDIR /app

# 1. Precisamos do openssl para o Prisma e bash para o script
RUN apk add --no-cache bash openssl

# 2. Copiamos os arquivos de dependências
COPY package*.json ./

# 3. Instalamos as dependências de produção
# DICA: Para o Prisma 7 ler o prisma.config.ts, ele geralmente precisa do 'jiti'
RUN npm ci --omit=dev

# 4. COPIAMOS O CLIENTE GERADO
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# 5. COPIAMOS O ESSENCIAL (Ajustado para Prisma 7)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# IMPORTANTE: Copiar o arquivo de configuração TS
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts 

EXPOSE 3333

CMD ["bash", "-c", "npx prisma migrate deploy && node dist/src/main"]