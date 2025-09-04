import { redis } from "./redisClient.js"

export const publishNewBlog = async(blog) => {
  await redis.publish("new-blog", JSON.stringify(blog));
}

export const publishUpdatedBlog = async(blog) => {
  await redis.publish("update-blog", JSON.stringify(blog));
}

export const publishNewComment = async(comment) => {
  await redis.publish("new-comment", JSON.stringify(comment));
}