import { publisher } from "./redisClient.js"

export const publishNewBlog = async(blog) => {
  await publisher.publish("new-blog", JSON.stringify(blog));
}

export const publishUpdatedBlog = async(blog) => {
  await publisher.publish("update-blog", JSON.stringify(blog));
}

export const publishNewComment = async(comment) => {
  await publisher.publish("new-comment", JSON.stringify(comment));
}