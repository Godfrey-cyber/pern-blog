import { publisher } from "./redisClient.js"

const safePublish = async (channel, data) => {
  try {
    const result = await publisher.publish(channel, JSON.stringify(data));
    console.log(`Published ${channel} event to ${result} subscribers`);
    return result;
  } catch (error) {
    console.error(`Error publishing to ${channel}:`, error);
    // Don't throw - allows the main operation to continue even if Redis fails
    return 0;
  }
};

// export const publishNewBlog = async(blog) => {
//   try {
//     await publisher.publish("new-blog", JSON.stringify(blog));
//     console.log(`Published new-blog event to ${result} subscribers`);
//     return result;
//   } catch (error) {
//     console.error("Error publishing new-blog:", error);
//     throw error;
//   }
// }

// export const publishUpdatedBlog = async(blog) => {
//   try {
//     await publisher.publish("update-blog", JSON.stringify(blog));
//     console.log(`Published update-blog event to ${result} subscribers`);
//     return result;
//   } catch (error) {
//     console.error("Error publishing update-blog:", error);
//     throw error;
//   }
// }

// export const publishNewComment = async(comment) => {
//   try {
//     const result = await publisher.publish("new-comment", JSON.stringify(comment));
//     console.log(`Published new-comment event to ${result} subscribers`);
//     return result;
//   } catch (error) {
//     console.error("Error publishing new-comment:", error);
//     throw error;
//   }
// }

export const publishNewBlog = async (blog) => {
  return await safePublish("new-blog", blog);
};

export const publishUpdatedBlog = async (blog) => {
  return await safePublish("update-blog", blog);
};

export const publishNewComment = async (comment) => {
  return await safePublish("new-comment", comment);
};