### STAGE 1: Build ###
FROM node AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build --prod

### STAGE 2: Run ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/sys-doc /usr/share/nginx/html
