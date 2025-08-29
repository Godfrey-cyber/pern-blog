import { prisma } from "../models/prismaClient.js"
import { redis } from "../redis/redisClient.js"
import { errorResponse, successResponse } from "../utiles/response.js"

export const comment = async (req, res, next) => {
  const { content } = req.body;
  const { blogId } = req.params;
  const userId = req.userId; // Set by your authentication middleware

  try {
    if (!content) {
      return errorResponse(res, 400, "Content not found.")
    }
    
    // Optional: Ensure the blog exists
    const blog = await prisma.blog.findUnique({ where: { id: Number(blogId) } });
    if (!blog) {
      return errorResponse(res, 404, "No blog found.")
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        blog: { connect: { id: Number(blogId) } },
        author: { connect: { id: userId } }
      },
      include: { author: {
        select: { id: true, username: true, email: true, role: true }
      } }
    });
    successResponse(res, 201, "Comment successfully created", comment)
  } catch (error) {
    next(error);
  }
};

export const commentsByBlog = async (req, res, next) => {
	const { id } = req.params;
  const cacheKey = `comments:${id}`;
	try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
	    // Find all comments for the specified blog, including author info
    const comments = await prisma.comment.findMany({
      where: { blogID: Number(id) },
      include: { author: {
        select: { id: true, username: true, email: true, role: true }
      } }
    });
     // Cache result in Redis for 1 hour
    await redis.set(cacheKey, JSON.stringify(comments), 'EX', 3600);
    successResponse(res, 200, "Comment fetched successfully", comments)
  } catch (error) {
    next(error);
  }
}