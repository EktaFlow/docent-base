FROM node:8.11.4
WORKDIR /user/src/front
COPY package*.json ./
RUN npm install
RUN npm install -g ionic

COPY . .

# ARG PORT
# ENV PORT_NUM=$PORT

CMD ionic serve
