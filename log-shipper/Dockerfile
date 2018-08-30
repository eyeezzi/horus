# Aparently the onbuild variant is better for customization, sadly, it is errors on build.
FROM fluent/fluentd:v0.12


# Then copy-over our custom config file
COPY fluentd.conf /fluentd/etc/

ENV FLUENTD_CONF="fluentd.conf"