FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Ensure the logs directory exists
RUN mkdir -p logs

# Generate Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma


EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy --schema=prisma/schema.prisma && npm start"]