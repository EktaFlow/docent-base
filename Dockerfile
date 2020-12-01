FROM node:13.10.1
WORKDIR /user/src/front
COPY package*.json ./
RUN npm install
RUN npm install -g ionic

COPY . .
EXPOSE 8100
CMD npm run start
