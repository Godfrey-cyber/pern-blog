import express from "express";
const router = express.Router();
import { comment, commentsByBlog } from "../controllers/comment.js";
import { authenticate, restrictTo, } from '../middleware/middleware.js'

router.post('/write-comment/:blogId', authenticate, restrictTo('ADMIN', 'AUTHOR', 'USER'), comment);
router.get('/blog-comment/:id', restrictTo('USER', 'AUTHOR', 'ADMIN'), commentsByBlog);

export default router;