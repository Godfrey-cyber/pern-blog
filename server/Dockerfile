FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure the logs directory exists
RUN mkdir -p logs

# Generate Prisma client
# RUN npx prisma generate --schema=prisma/schema.prisma
CMD ["sh", "-c", "npx prisma migrate deploy --schema=prisma/schema.prisma && npm start"]

EXPOSE 3000

CMD ["npm", "run", "dev"]