FROM node:10

WORKDIR /workspace/crimedb_alpha

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD [ "node", "server.js" ]