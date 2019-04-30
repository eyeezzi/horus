FROM node:10.10.0-alpine

WORKDIR /usr/src/app

# optimization to only rebuild npm modules iff package[-lock].json changes
COPY src/package*.json ./

# TODO: only install nodemon if some arg is set to 'dev'
RUN npm install -g nodemon
# For production `RUN npm install --only=production`
RUN npm install

COPY src .

CMD ["node", "."]