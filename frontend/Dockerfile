# -----------------------------------------------------------------------------
# ESTÁGIO 1: Base (Instalação de Dependências)
# -----------------------------------------------------------------------------
FROM node:22-alpine AS base

# Instala libc6-compat (necessário para bibliotecas como Sharp/Image Optimization no Alpine)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia apenas os arquivos de dependência para aproveitar o cache do Docker
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instala dependências baseado no gerenciador de pacotes detectado
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# -----------------------------------------------------------------------------
# ESTÁGIO 2: Builder (Construção do Projeto)
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Desabilita telemetria do Next.js durante o build
ENV NEXT_TELEMETRY_DISABLED=1

# Executa o build
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else npm run build; \
  fi

# -----------------------------------------------------------------------------
# ESTÁGIO 3: Runner (Imagem Final de Produção)
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cria um usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia a pasta public (imagens, favicons, etc)
COPY --from=builder /app/public ./public

# Copia o build standalone gerado pelo Next.js (Otimização Máxima)
# Permissões corretas para o usuário nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Define o usuário para execução
USER nextjs

# Expõe a porta padrão
EXPOSE 3000
ENV PORT=3000

# Comando de inicialização otimizado
CMD ["node", "server.js"]