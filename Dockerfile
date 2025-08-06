FROM node:22

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/dist

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 8000

CMD [ "node", "dist/server.js" ]
