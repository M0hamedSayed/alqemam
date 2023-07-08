# ------------------> The Production Image <---------------------
FROM nginx:alpine
LABEL maintainer="Mohamed Sayed <mohamed.sayed.atiaa@gmail.com>"


EXPOSE 80

COPY  /dist/apps/frontend /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf