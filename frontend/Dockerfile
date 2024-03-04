FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./build /usr/src/app/build

EXPOSE 3000

CMD ["npm", "start"]
