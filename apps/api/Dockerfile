FROM node:18.12.1-buster-slim AS builder

ENV UV_THREADPOOL_SIZE 64
ENV NODE_ENV=production

ARG COMMIT_ID

WORKDIR /app

COPY . .

USER node

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]

