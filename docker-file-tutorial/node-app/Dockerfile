FROM node:6

WORKDIR /src
COPY package.json /src/package.json
RUN cd /src; npm install
COPY . /src

EXPOSE 3000

CMD node index.js
