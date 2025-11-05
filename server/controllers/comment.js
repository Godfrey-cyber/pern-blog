import { prisma } from "../models/prismaClient.js"
import { publishNewComment } from "../redis/publisher.js"
import { publisher, redisClient } from "../redis/redisClient.js"
import { errorResponse, successResponse } from "../utiles/response.js"

const publisher = redis
export const comment = async (req, res, next) => {
  const { content } = req.body;
  const { blogId } = req.params;
  const userId = req.userId; // Set by your authentication middleware
  const commentsCacheKey = `commentsByBlog:${blogId}`;
  const blogCacheKey = `blog:${blogId}`; // 👈 add this
  try {
    if (!content) {
      return errorResponse(res, 400, "Content not found.")
    }
    
    // Optional: Ensure the blog exists
    const blog = await prisma.blog.findUnique({ where: { id: Number(blogId) } });
    if (!blog) {
      return errorResponse(res, 404, "No blog found.")
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        blog: { connect: { id: Number(blogId) } },
        author: { connect: { id: userId } }
      },
      include: { author: {
        select: { id: true, username: true }
      } }
    });
    // 🧹 Clear all relevant caches
    await Promise.all([
      redisClient.del(commentsCacheKey),
      redisClient.del(blogCacheKey),
    ]);
    successResponse(res, 201, "Comment successfully created", newComment)
  } catch (error) {
    next(error);
  }
};

export const commentsByBlog = async (req, res, next) => {
	const { id } = req.params;
  const cacheKey = `commentsByBlog:${id}`;
	try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
	    // Find all comments for the specified blog, including author info
    const comments = await prisma.comment.findMany({
      where: { blogID: Number(id) },
      // orderBy: { createdAt: "desc" },
      include: { author: {
        select: { id: true, username: true, email: true, role: true }
      } }
    });
     // Cache result in Redis for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(comments), 'EX', 3600);
    successResponse(res, 200, "Comment fetched successfully", comments)
  } catch (error) {
    next(error);
  }
}
