FROM alpine:3.9.3

# required by wait script
RUN apk add --no-cache bash curl

COPY jaeger-query wait.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/wait.sh