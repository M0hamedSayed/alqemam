# ------------------> The Build Image <---------------------
FROM node:18.14 AS build
LABEL maintainer="Mohamed Sayed <mohamed.sayed.atiaa@gmail.com>"

WORKDIR /usr/src/app

COPY  ./dist/apps/backend/package.json ./

ENV NODE_ENV=production

# clean install for production with pnpm
RUN npm install -g pnpm && \
    pnpm install --prod && \
    pnpm audit --fix

COPY  ./dist/apps/backend .

#node-prune is a small tool to prune unnecessary files from ./node_modules
RUN curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune 

# ------------------> The Production Image <---------------------
FROM node:18.14-alpine

ENV NODE_ENV production

#Safely terminate Node.js Docker web applications
RUN apk add dumb-init

# Create a non-root user and group
RUN groupadd -r mohamed && useradd -m -r -g mohamed mohamed
# USER node
WORKDIR /usr/src/app/
RUN chown -R mohamed:mohamed /usr/src/app
USER mohamed
COPY --chown=mohamed:mohamed --from=build /usr/src/app /usr/src/app
# RUN chmod -R 777 /usr/src/app/*
CMD ["dumb-init", "node", "main.js"]
