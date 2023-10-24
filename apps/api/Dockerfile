FROM node:18.12.1-buster-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV UV_THREADPOOL_SIZE 64
ENV NODE_ENV=production

WORKDIR /app

# copy all required package.json files for installation
COPY ./json .

RUN pnpm install --prod --frozen-lockfile

# copy all built files required to run the app
COPY ./full .

USER node

EXPOSE 3000

ENV PORT=3000

WORKDIR apps/api

CMD ["pnpm", "start"]

