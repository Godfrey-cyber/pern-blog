import { prisma } from "../models/prismaClient.js"
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
	try {
	    // Find all comments for the specified blog, including author info
    const comments = await prisma.comment.findMany({
      where: { blogID: Number(id) },
      include: { author: true }
    });
    successResponse(res, 200, "Comment fetched successfully", comments)
  } catch (error) {
    next(error);
  }
}