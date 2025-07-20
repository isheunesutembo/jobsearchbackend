FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6013

CMD ["npm","start"]