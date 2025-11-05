import { publisher, subscriber } from "./redisClient.js";

// Publish blog creation
// await publisher.publish("blog-events", JSON.stringify({
//   type: "NEW_BLOG",
//   blogId: 1,
// }));

// // Subscribe
// subscriber.subscribe("blog-events", (err, count) => {
//   if (err) {
//     console.error("Failed to subscribe:", err);
//   } else {
//     console.log(`Subscribed to ${count} channel(s)`);
//   }
// });


// // Listen for messages
// subscriber.on("message", (channel, message) => {
//   console.log(`Received on ${channel}:`, JSON.parse(message))
// });