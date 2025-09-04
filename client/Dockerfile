FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 5500

CMD ["npm", "run", "dev", "--", "--host"]
