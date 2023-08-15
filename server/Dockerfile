FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6000

CMD [ "node", "index.js" ]
