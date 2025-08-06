FROM node:22

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/dist && \
  chown -R 0:0 /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
