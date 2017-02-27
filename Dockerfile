FROM node:slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN cd /usr/src/app
RUN npm install
RUN node -v

COPY . /usr/src/app

EXPOSE 4000
CMD [ "npm", "start"]
