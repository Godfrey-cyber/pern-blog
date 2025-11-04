import Redis from "ioredis"

// export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// Publisher
export const publisher = new Redis(redisUrl);
// Subscriber
export const subscriber = new Redis(redisUrl);
export const redisClient = new Redis(redisUrl)

// errors
publisher.on("error", (err) => console.error("Redis Publisher Error", err));
subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));
redisClient.on("error", (err) => console.error("Redis Subscriber Error", err));s