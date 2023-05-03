FROM node:19-alpine3.16 AS backend

WORKDIR /groundStation

COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 9000

CMD ["node", "server.js"]
