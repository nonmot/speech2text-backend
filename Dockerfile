FROM node:22

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/dist && \
  chown -R 1001:0 /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 8000

USER 1001

CMD [ "npm", "start" ]
