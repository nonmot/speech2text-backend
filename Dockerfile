FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
