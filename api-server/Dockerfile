FROM node:10.10.0-alpine

WORKDIR /usr/src/app

# optimization to only rebuild npm modules iff package[-lock].json changes
COPY src/package*.json ./

# For production `RUN npm install --only=production`
RUN npm install

COPY src .

CMD ["npm", "start"]