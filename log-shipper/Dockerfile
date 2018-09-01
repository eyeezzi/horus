# Aparently the onbuild variant is better for customization, sadly, it is errors on build.
FROM fluent/fluentd:v0.12

# We need to install a plugin for logz.io output :(
RUN apk add --update --virtual .build-deps \
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