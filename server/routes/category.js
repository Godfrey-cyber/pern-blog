import express from "express";
const router = express.Router();
import { createCategory } from "../controllers/category.js";
import { authenticate, restrictTo, } from '../middleware/middleware.js'

router.post('/create-category', authenticate, restrictTo('ADMIN'), createCategory);
// router.get('/get-categories', authenticate, restrictTo('ADMIN'), getCategories);

export default router;