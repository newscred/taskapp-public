FROM node:16-alpine

RUN mkdir /code
WORKDIR /code
ADD . /code/

RUN yarn install

EXPOSE 8080
CMD yarn dev
