FROM node:9-stretch
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g jest
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
