FROM node:10
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN mkdir /app
WORKDIR /app

COPY . /app
