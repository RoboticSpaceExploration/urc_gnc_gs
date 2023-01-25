FROM node:19-alpine3.16

WORKDIR /groundStation

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD [ "node", "server.js"]