import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const subscriber = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

subscriber.on("connect", () => console.log("Subscriber connected to Redis!"));
subscriber.on("error", (err) => console.error("Redis subscriber error:", err));


// Subscribe to all channels at once
subscriber.subscribe("new-blog", "update-blog", "new-comment", (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err);
  } else {
    console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
  }
});

// Handler functions
const handleNewBlog = (blog) => {
  console.log("📢 New blog created:", blog);
  // Your business logic here
};

const handleUpdateBlog = (blog) => {
  console.log("📢 Blog updated:", blog);
  // Your business logic here
};

const handleNewComment = (comment) => {
  console.log("📢 New comment created:", comment);
  // Your business logic here
};

// Single message handler routing to specific handlers
subscriber.on("message", (channel, message) => {
  try {
    const data = JSON.parse(message);
    
    const handlers = {
      "new-blog": handleNewBlog,
      "update-blog": handleUpdateBlog,
      "new-comment": handleNewComment
    };
    
    const handler = handlers[channel];
    if (handler) {
      handler(data);
    } else {
      console.log(`No handler for channel: ${channel}`);
    }
  } catch (error) {
    console.error(`Error processing message from ${channel}:`, error);
  }
});

export { subscriber };

// // SUBSCRIBE NEW BLOG
// subscriber.subscribe("new-blog", (err, count) => {
//   if (err) {
//     console.error("Failed to subscribe:", err);
//   } else {
//     console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
//   }
// });

// subscriber.on("message", (channel, message) => {
//   if (channel === "new-blog") {
//     const blog = JSON.parse(message);
//     console.log("📢 New blog created:", blog);
//   }
// });

// // SUBSCRIBE UPDATED BLOG
// subscriber.subscribe("update-blog", (err, count) => {
//   if (err) {
//     console.error("Failed to subscribe:", err);
//   } else {
//     console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
//   }
// });

// subscriber.on("message", (channel, message) => {
//   if (channel === "update-blog") {
//     const blog = JSON.parse(message);
//     console.log("📢 Blog updated:", blog);
//   }
// });

// // SUBSCRIBE NEW COMMENT
// subscriber.subscribe("new-comment", (err, count) => {
//   if (err) {
//     console.error("Failed to subscribe:", err);
//   } else {
//     console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
//   }
// });

// subscriber.on("message", (channel, message) => {
//   if (channel === "new-comment") {
//     const comment = JSON.parse(message);
//     console.log("📢 New comment created:", comment);
//   }
// });

// export { subscriber };