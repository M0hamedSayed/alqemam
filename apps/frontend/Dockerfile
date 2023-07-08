# ------------------> The Production Image <---------------------
FROM nginx
LABEL maintainer="Mohamed Sayed <mohamed.sayed.atiaa@gmail.com>"

EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/apps/frontend /usr/share/nginx/html