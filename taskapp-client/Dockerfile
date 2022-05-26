FROM node:16-alpine

RUN mkdir /code
WORKDIR /code
ADD . /code/

RUN yarn install

EXPOSE 3000
CMD yarn start
