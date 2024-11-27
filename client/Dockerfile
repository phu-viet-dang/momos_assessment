# DEV environment

# FROM node:20
# WORKDIR /app
# COPY package.json /app
# COPY .env ./
# RUN yarn install
# COPY . /app
# CMD ["yarn", "run", "start"]

# ----------------------------------------
# DEV environment

# Stage 1: Build the React app
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]