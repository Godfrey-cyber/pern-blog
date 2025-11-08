import Redis from "ioredis"

const redisConfig = process.env.REDIS_URL 
  ? process.env.REDIS_URL 
  : {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
    };

// Publisher
export const publisher = new Redis(redisConfig);
// Subscriber
export const subscriber = new Redis(redisConfig);
export const redisClient = new Redis(redisConfig)

// Error handlers
publisher.on("error", (err) => console.error("Redis Publisher Error", err));
subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));
redisClient.on("error", (err) => console.error("Redis Client Error", err));



// Connection success handlers (optional but helpful)
publisher.on("connect", () => console.log("Redis Publisher Connected"));
subscriber.on("connect", () => console.log("Redis Subscriber Connected"));
redisClient.on("connect", () => console.log("Redis Client Connected"));

process.on("SIGINT", async () => {
  console.log("Closing Redis connections...");
  await Promise.all([
    publisher.quit(),
    subscriber.quit(),
    redisClient.quit()
  ]);
  process.exit(0);
});