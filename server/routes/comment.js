import express from "express";
const router = express.Router();
import { comment, commentsByBlog } from "../controllers/comment.js";
import { authenticate, restrictTo, } from '../middleware/middleware.js'

router.post('/write-comment/:blogId', authenticate, restrictTo('ADMIN', 'AUTHOR'), comment);
router.get('/blog-comment/:id', authenticate, restrictTo('USER'), commentsByBlog);

export default router;