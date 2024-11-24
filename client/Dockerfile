FROM node:20
WORKDIR /app
COPY package.json /app
COPY .env ./
RUN yarn install
COPY . /app
CMD ["yarn", "run", "start"]