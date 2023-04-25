FROM node:19-alpine3.16
WORKDIR /groundStation
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run build
EXPOSE 3000

CMD [ "serve", "-s", "build"]
