FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
                                
RUN npm install
                                
COPY ./build /usr/src/app/build
                     
EXPOSE 3000

CMD ["npm", "start"]
