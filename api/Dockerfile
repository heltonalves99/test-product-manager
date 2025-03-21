FROM node:20-alpine

WORKDIR /app

COPY api/package*.json api/yarn.lock ./

RUN yarn global add @nestjs/cli
RUN yarn install

COPY ./api/ .

EXPOSE 3000

CMD ["yarn", "start:dev"]
