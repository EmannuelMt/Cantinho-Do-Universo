FROM node:18-alpine

WORKDIR /app

# Instalar dependências de build
RUN apk add --no-cache \
    mongodb-tools \
    python3 \
    make \
    g++

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Criar diretórios necessários
RUN mkdir -p backups uploads

# Expor porta
EXPOSE 5000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=5000

# Comando de inicialização
CMD ["npm", "start"]