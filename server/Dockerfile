## Build stage
FROM node:20-alpine AS build

# Set working directory for RUN, CMD, COPY, ADD
WORKDIR /app

COPY package.json yarn.lock .env ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

## Deploy stage
FROM node:20-alpine AS deploy

WORKDIR /app

# Chromium version chromium-124.0.6367.78-r0
RUN echo -e "https://dl-cdn.alpinelinux.org/alpine/v3.19/main\nhttps://dl-cdn.alpinelinux.org/alpine/v3.19/community" > /etc/apk/repositories
RUN apk update && apk add chromium

ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser


COPY --from=build /app/package.json /app/yarn.lock /app/tsconfig.json /app/.env /app/.sequelizerc /app/types.d.ts ./
COPY --from=build /app/build ./build

COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001

CMD ["npm", "start"]
