FROM node:14

WORKDIR /usr/src/app

RUN npm cache clean --force

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
