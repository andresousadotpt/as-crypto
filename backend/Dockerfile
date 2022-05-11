# pull the base image
# YARN WORKS IN ALPINE
FROM php:7.4.19-fpm-alpine3.13
RUN apk update
RUN apk add screen
RUN apk add nano

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN mkdir -p /api
WORKDIR /api

COPY . ./

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN composer install

