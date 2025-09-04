import { prisma } from "../models/prismaClient.js"
import { redis } from "../redis/redisClient.js"
import { publishNewBlog, publishUpdatedBlog } from "../redis/publisher.js"
import slugify from 'slugify'
import { errorResponse, successResponse } from "../utiles/response.js"

const publisher = redis;
// @POST - create a blog
export const createBlog = async (req, res, next) => {
  const { description, title, content, categoryID } = req.body;
  const cacheKey = "blogs:all";
  try {
    if (!description || !title || !content || !categoryID) {
      return errorResponse(res, 400, "All fields are required")
    }
    if (!req.userId) {
      return errorResponse(res, 401, "Unauthorized");
    }
    const slug = slugify(title, { lower: true })
    // Check for duplicate slug
    const existingSlug = await prisma.blog.findUnique({ where: { slug } })
    if (existingSlug) {
      return errorResponse(res, 409, "🚫 A blog with this title already exists")
    }
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryID } });
    if (!existingCategory) {
      return errorResponse(res, 404, "Category not found");
    }
    const blog = await prisma.blog.create({
      data: {
        description,
        title,
        content,
        slug,
        author: { connect: { id: req.userId } },
        category: { connect: { id: categoryID } }
      },
      include: {
        author: { select: { id: true, username: true, email: true, role: true } },
        category: { select: { id: true, title: true, slug: true } }
      }
    });
    await redis.del(cacheKey);
    // await publisher.publish("new-blog", JSON.stringify(blog));
    await publishNewBlog(blog);
    return successResponse(res, 201, "Blog created successfully", blog)
  } catch (error) {
    next(error)
  }
};

// @GET - get all blogs
export const blogs = async (req, res, next) => {
  const cacheKey = "blogs:all";
  try {
    const cachedBlogs = await redis.get(cacheKey);
    if (cachedBlogs) {
      const blogs = JSON.parse(cachedBlogs);
      return successResponse(res, 200, "Blog successfully fetched (from cache)", blogs);
    }

    const blogs = await prisma.blog.findMany({
      include: { 
        authorID: false,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        }, 
      },
    });
    if (!blogs) {
      return errorResponse(res, 404, "No blogs found")
    }
    await redis.set(cacheKey, JSON.stringify(blogs), "EX", 60);
    return successResponse(res, 200, "Blog successfully fetched", blogs)
  } catch (error) {
    next(error)
  }
};
// @GET - get my blogs
export const myBlogs = async (req, res, next) => {
  const cacheKey = `myblogs:${req.userId}`;
  const cachedBlogs = await redis.get(cacheKey);
  if (cachedBlogs) {
    const blogs = JSON.parse(cachedBlogs);
    return successResponse(res, 200, "Blog successfully fetched (from cache)", blogs);
  }
  try {
    const blogs = await prisma.blog.findMany({ 
      where: { authorID: Number(req.userId) },
      include: { 
        authorID: false,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        }, 
      },
    })
    if (!blogs || blogs.length === 0) {
      return errorResponse(res, 404, "Blogs not found")
    }
    await redis.set(cacheKey, JSON.stringify(blogs), "EX", 60);
    return successResponse(res, 200, "Your Blogs successfully fetched", blogs)
  } catch (error) {
    next(error)
  }
}

// @PATCH - update a blog
export const updateBlog = async (req, res, next) => {
  const { id } = req.params
  const cacheKey = `blog:${id}`;
  const { title, description, content } = req.body

  try {
    const blog = await prisma.blog.findUnique({ where: { id: Number(id) } })
    if (!blog) return errorResponse(res, 404, "Blog not found")
    if (blog.authorID !== req.userId) {
      return errorResponse(res, 403, "You are not authorized to update this blog")
    }
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        content
      }
    })
    await redis.del(cacheKey);
    await publishUpdatedBlog(updatedBlog);
    return successResponse(res, 200, "Blog successfully updated", updatedBlog)
  } catch (error) {
    next(error)
  }
}

// @GET - get blog by id
export const blogByID = async (req, res, next) => {
  const { id } = req.params
  const cacheKey = `blog:${id}`;
  try {
    // Try fetching blogs from Redis first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: { 
        authorID: false,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true
          }
        }, 
      },
    });
    if (!blog) {
      return errorResponse(res, 404, "Blog not found")
    }
    // Cache result in Redis for 1 hour
    await redis.set(cacheKey, JSON.stringify(blog), 'EX', 3600);
    return successResponse(res, 200, "Blog successfully fetched", blog)
  } catch (error) {
    next(error)
  }
};