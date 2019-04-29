FROM fluent/fluentd:v1.4-2

# Use root account to use apk
USER root

# We need to install a plugin for logz.io output
RUN apk add --no-cache --update --virtual .build-deps \
        sudo build-base ruby-dev \
 && sudo gem install \
        fluent-plugin-logzio \
 && sudo gem sources --clear-all \
 && apk del .build-deps \
 && rm -rf /var/cache/apk/* \
           /home/fluent/.gem/ruby/2.4.0/cache/*.gem

# Then copy-over our custom config file
COPY fluentd.conf /fluentd/etc/
ENV FLUENTD_CONF="fluentd.conf"

USER fluent

# reference: https://hub.docker.com/r/fluent/fluentd