import express from "express";
const router = express.Router();
import { createBlog, blogs, updateBlog, myBlogs, blogByID } from "../controllers/blog.js";
import { authenticate, restrictTo } from '../middleware/middleware.js'

router.post('/write-blog', authenticate, restrictTo('ADMIN', 'AUTHOR'), createBlog);
router.get('/all-blogs', blogs);
router.get('/my-blogs', authenticate, restrictTo('ADMIN', 'AUTHOR'), myBlogs);
router.patch('/update-blog/:id', authenticate, restrictTo('ADMIN', 'AUTHOR'), updateBlog);
router.get('/blog/:id', blogByID);


export default router;