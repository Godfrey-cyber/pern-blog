import { prisma } from "../models/prismaClient.js"
import { redis } from "../redis/redisClient.js"
import slugify from 'slugify'
import { errorResponse, successResponse } from "../utiles/response.js"

// @POST - create a category
export const createCategory = async (req, res, next) => {
  const { description, title, image } = req.body;
  // const { role, id } = req.user
  const id = req.userId
  try {
    if (!description || !title || !image) {
      return errorResponse(res, 400, "All fields are required")
    }
    // if (role !== "ADMIN") {
    //   return errorResponse(res, 403, "Not allowed! You are not an admin")
    // }
    const slug = slugify(title, { lower: true })
    // Check for duplicate slug
    const existingSlug = await prisma.category.findUnique({ where: { slug } })
    if (existingSlug) {
      return errorResponse(res, 409, "🚫 A category with this title already exists")
    }
    const category = await prisma.category.create({
      data: { description, title, image, slug, author: { connect: { id: req.userId } }},
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true }
        }
      }
    });
    return successResponse(res, 201, "Category created successfully", category)
  } catch (error) {
    console.log(error)
    next(error)
  }
};