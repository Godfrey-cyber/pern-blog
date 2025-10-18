import { prisma } from "../models/prismaClient.js"
import slugify from 'slugify'
import { errorResponse, successResponse } from "../utiles/response.js"
import { publisher, redisClient } from "../redis/redisClient.js"

// @POST - create a blog
export const createBlog = async (req, res, next) => {
  const { description, title, content, categoryID, image } = req.body;
  const cacheAllBlogs = "blogs:all";
  const cacheCategoryBlogs = `category:blogs:${categoryID}`;
  try {
    if (!description || !title || !content || !categoryID || !image) {
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
    // Check for duplicate slug
    const existingCategory = await prisma.category.findUnique({ where: { id: parseInt(categoryID, 10) } });
    if (!existingCategory) {
      return errorResponse(res, 404, "Category not found");
    }
    const blog = await prisma.blog.create({
      data: {
        description,
        title,
        content,
        image,
        slug,
        author: { connect: { id: req.userId } },
        category: { connect: { id: parseInt(categoryID, 10) } }
      },
      include: {
        author: { select: { id: true, username: true, email: true, role: true } },
        category: { select: { id: true, title: true, slug: true } }
      }
    });
    await Promise.all([
      redisClient.del(cacheAllBlogs),
      redisClient.del(cacheCategoryBlogs),
    ]);
    // await publisher.publish("blog-events", JSON.stringify({
    //   type: "NEW_BLOG",
    //   blog,
    // }));
    return successResponse(res, 201, "Blog created successfully", blog)
  } catch (error) {
    next(error)
  }
};

// @GET - get all blogs
export const blogs = async (req, res, next) => {
  await redisClient.flushDb()
  const cacheKey = "blogs:all";
  try {
    const cachedBlogs = await redisClient.get(cacheKey);
    if (cachedBlogs) {
      const blogs = JSON.parse(cachedBlogs);
      return successResponse(res, 200, "Blog successfully fetched (from cache)", blogs);
    }
    const blogs = await prisma.blog.findMany({
      take: 6,
      include: { 
        authorID: false,
        author: {
          select: {
            id: true,
            username: true,
          }
        },
        category: { select: { title: true } },
      },
    });
    if (!blogs || blogs.length === 0) {
      return errorResponse(res, 404, "Blogs not found")
    }
    await redisClient.set(cacheKey, JSON.stringify(blogs), "EX", 60);
    return successResponse(res, 200, "Blog successfully fetched", blogs)
  } catch (error) {
    next(error)
  }
};
// @GET - get my blogs
export const myBlogs = async (req, res, next) => {
  const cacheKey = `myblogs:${req.userId}`;
  const cachedBlogs = await redisClient.get(cacheKey);
  if (cachedBlogs) {
    const blogs = JSON.parse(cachedBlogs);
    return successResponse(res, 200, "Blog successfully fetched (from cache)", blogs);
  }
  try {
    const blogs = await prisma.blog.findMany({ 
      where: { authorID: Number(req.userId) },
      orderBy: { createdAt: "desc" },
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
        category: { select: { title: true, slug: true } },  
      },
    })
    if (!blogs || blogs.length === 0) {
      return errorResponse(res, 404, "Blogs not found")
    }
    await redisClient.set(cacheKey, JSON.stringify(blogs), "EX", 60);
    return successResponse(res, 200, "Your Blogs successfully fetched", blogs)
  } catch (error) {
    console.log(error)
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
    await redisClient.del(`blog:${updatedBlog.id}`);
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
    const cached = await redisClient.get(cacheKey);
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
          }
        },
        category: { select: { title: true, slug: true } },
        comments: { select: { id: true, content: true, author: { select: { username: true } }, createdAt: true } },  
      },
    });
    if (!blog) {
      return errorResponse(res, 404, "Blog not found")
    }
    // Cache result in Redis for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(blog), 'EX', 3600);
    return successResponse(res, 200, "Blog successfully fetched", blog)
  } catch (error) {
    next(error)
  }
};

// GET Blogs by Category
export const blogsByCategory = async (req, res, next) => {
  const { id } = req.params
  const cacheKey = `category:blogs:${id}`
  try {
    // Fetching cached blogs from Redis first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return successResponse(res, 200, "Blogs successfully fetched by Category (cached)", JSON.parse(cached))
    }
    const blogsByCat = await prisma.category.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        description: true,
        blogs: {
          orderBy: { createdAt: "desc" },
          select: { 
            title: true, id: true, slug: true, image: true, description: true, createdAt: true, 
            author: { select: { username: true } }, 
            category: { select: { title: true } }, 
          }
        }
      },
    });
    if (!blogsByCat) {
      return errorResponse(res, 404, "Category not found")
    }
    // Cache result in Redis for 1 hour
    await redisClient.set(cacheKey, JSON.stringify(blogsByCat), 'EX', 60);
    // await redisClient.setEx(cacheKey, 60, JSON.stringify(blogsByCat));
    return successResponse(res, 200, "Blogs successfully fetched by Category", blogsByCat)
  } catch (error) {
    next(error)
  }
}

export const deleteManyBlogs = async(req, res) => {
  // const ids = [1,2,3,4,5,6]
  const { ids } = req.body

  try {
    // ✅ 1. Validate input
    if (!Array.isArray(ids) || ids.length === 0) {
      return errorResponse(res, 400, "Please provide an array of blog IDs to delete.");
    }

    const blogs = await prisma.blog.findMany({
      where: { id: { in: ids.map(Number) } },
      select: { id: true, categoryID: true }
    });

    if (blog.length === 0) {
      return errorResponse(res, 404, "No matching blogs found")
    }
    // delete
    const deleted = await prisma.blog.deleteMany({
      where: { id: { in: ids.map(Number) } },
    });

    // ✅ 4. Clear caches
    const categoryIds = [...new Set(blogs.map(b => b.categoryId))]; // unique categories

    // Delete category-level cache for affected categories
    for (const catId of categoryIds) {
      await redisClient.del(`category:blogs:${catId}`);
    }

    // Also clear all blogs cache if you have a global key
    await redisClient.del("blogs:all");

    return successResponse(res, 200, `${deleted.count} blogs deleted successfully.`);
  } catch (error) {
    console.log(error)
  }
}

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    // ✅ 1. Validate ID
    const blogId = Number(id);
    if (isNaN(blogId)) {
      return errorResponse(res, 400, "Invalid blog ID");
    }

    // ✅ 2. Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true, categoryID: true },
    });

    if (!existingBlog) {
      return errorResponse(res, 404, "Blog not found");
    }
    // ✅ 3. Delete blog
    await prisma.blog.delete({
      where: { id: blogId },
    });

    // ✅ 4. Optional: delete related comments
    // await prisma.comment.deleteMany({
    //   where: { blogId },
    // });

    // ✅ 5. Clear caches
    await redisClient.del(`blog:${blogId}`); // single blog cache
    await redisClient.del("blogs:all"); // global blog cache
    await redisClient.del(`category:blogs:${existingBlog.categoryID}`); // category cache

    return successResponse(res, 200, "Blog deleted successfully");
  } catch (error) {
    next(error);
  }
}