FROM node:10-alpine as build
LABEL maintainer="Jimmy Yen"

WORKDIR /app

COPY ./package.json /app/package.json

RUN yarn install

COPY . .

RUN yarn build


FROM nginx
LABEL maintainer="Jimmy Yen"

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
