FROM node:10.10.0-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash curl \
	&& npm install -g nodemon

# Copy the wait script in so we can call it in docker-compose.
COPY wait.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait.sh

# optimization to only rebuild npm modules iff package[-lock].json changes
COPY src/package*.json ./
# For production `RUN npm install --only=production`
RUN npm install
COPY src .


CMD ["npm", "run", "dev"]