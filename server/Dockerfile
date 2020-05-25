FROM node:10
RUN apt-get update && apt-get install -qq -y build-essential git nodejs libpq-dev cmake libgit2-dev pkg-config --fix-missing --no-install-recommends
RUN apt-get install -y --no-install-recommends vim htop wget tar
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN mkdir /app
WORKDIR /app

COPY . /app
