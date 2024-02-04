FROM node:16.20.2-buster

RUN mkdir -p /app/node_modules
WORKDIR /app
COPY package*.json ./
COPY src/ .
COPY test/ .
COPY scraper.js .
RUN npm install
RUN chown -R node:node /app

USER node

RUN npm config set update-notifier false

