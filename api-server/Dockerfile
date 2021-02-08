FROM node:10.10.0-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash curl \
	&& yarn global add nodemon

COPY wait.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait.sh

COPY src/package.json src/yarn.lock ./
RUN yarn install

COPY src .

ENTRYPOINT ["yarn", "run", "dev"]

# ref: https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://runnable.com/blog/9-common-dockerfile-mistakes