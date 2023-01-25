# FROM node:19-alpine3.16

# WORKDIR /groundStation

# COPY package*.json ./

# RUN npm install

# COPY . . 

# EXPOSE 8080

# CMD [ "node", "server.js"]

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]