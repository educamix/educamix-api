# Use uma imagem oficial do Node.js como base
FROM node:16-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --force

# Copie o restante do código-fonte para o contêiner
COPY . .

# Compile o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a API vai rodar
EXPOSE 3000

# Comando para rodar a API no ambiente de produção
CMD ["npm", "run", "start:prod"]
