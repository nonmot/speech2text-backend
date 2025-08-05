FROM node:22

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/dist && \
  chown -R node:node /usr/src/app

USER node

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
