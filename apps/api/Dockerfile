# RUN DOCKER BUILD FROM ROOT OF THE WORKSPACE!!!
FROM node:18.12.1-buster-slim AS builder

ENV UV_THREADPOOL_SIZE 64
ENV NODE_ENV=production

ARG COMMIT_ID

WORKDIR /app

COPY ./out/json .
COPY ./out/package-lock.json ./package-lock.json

RUN npm ci --omit=dev

COPY ./out/full .

USER node

WORKDIR /app/apps/api

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]

