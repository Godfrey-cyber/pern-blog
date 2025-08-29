import { redis } from "./redisClient.js";
// import Redis from "ioredis"
const publisher = redis();
const subscriber = redis();

publisher.on("error", (err) => console.error("Redis Publisher Error", err));
subscriber.on("error", (err) => console.error("Redis Subscriber Error", err));

await subscriber.connect();
await publisher.connect();

subscriber.subscribe("new-comment", (msg) => {
  const newComment = JSON.parse(msg);
  console.log("New comment received:", newComment);
});


export { publisher, subscriber };