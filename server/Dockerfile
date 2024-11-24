## Build stage
FROM node:20-alpine AS build

# Set working directory for RUN, CMD, COPY, ADD
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

## Deploy stage
FROM node:20-alpine AS deploy

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/package.json /app/yarn.lock /app/tsconfig.json /app/.env ./
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "build/index.js"]
