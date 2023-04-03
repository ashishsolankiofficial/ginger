FROM --platform=$BUILDPLATFORM node:17.0.1-bullseye-slim as builder

RUN mkdir /usr/src/ginger
WORKDIR /usr/src/ginger

RUN npm install -g @angular/cli@14

COPY package.json package-lock.json ./

RUN npm install
RUN npm ci

COPY . .
