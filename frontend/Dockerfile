FROM node:19-alpine3.16 AS frontend

WORKDIR /groundStation

COPY package*.json ./

RUN npm install
RUN npm install -g serve
COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build"]

# FROM node:12.18.1
# ENV NODE_ENV=production

# WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production

# COPY . .

# EXPOSE 8080

# CMD [ "node", "server.js" ]
