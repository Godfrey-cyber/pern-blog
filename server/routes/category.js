import express from "express";
const router = express.Router();
import { createCategory, categories } from "../controllers/category.js";
import { authenticate, restrictTo } from '../middleware/middleware.js'

router.post('/create-category', authenticate, restrictTo('ADMIN'), createCategory);
router.get('/get-categories', categories);

export default router;