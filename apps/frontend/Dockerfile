# ------------------> The Production Image <---------------------
FROM nginx:alpine
LABEL maintainer="Mohamed Sayed <mohamed.sayed.atiaa@gmail.com>"

EXPOSE 80

USER root

RUN chown -R 1001:1001 /usr/share/nginx/html && \
    chown -R 1001:1001 /etc/nginx/conf.d

COPY --chown=1001:1001  /dist/apps/frontend /usr/share/nginx/html

USER 1001

CMD echo "server { \
      listen       80; \
      server_name  ـ; \
      server_tokens off; \
      error_page 405 = \$uri; \
      gzip on; \
      gzip_comp_level 5; \
      gzip_min_length 256; \
      gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css application/json; \
      ${NGINX_EXTRA_CONFIG} \
      location / { \
      root   /usr/share/nginx/html; \
      index  index.html index.htm; \
      try_files \$uri \$uri/ /index.html; \
      } \
      # redirect server error pages to the static page /50x.html \
      error_page   500 502 503 504  /50x.html; \
      location = /50x.html { \
      root   /usr/share/nginx/html; \
      } \
    }" > /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'
