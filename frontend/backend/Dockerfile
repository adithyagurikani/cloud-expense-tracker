FROM node:18

WORKDIR /var/task

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "hello.js"]
