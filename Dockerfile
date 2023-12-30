FROM node:16 AS builder

WORKDIR /client

COPY . .

RUN bash -c cd client; yarn install && yarn build


