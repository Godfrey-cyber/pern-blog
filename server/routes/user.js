import express from "express";
const router = express.Router();
import { rateLimit } from "../utiles/utiles.js"
import { signup, login, users, refresh } from "../controllers/user.js";

router.post('/signup', signup);
router.post('/login', rateLimit, login);
router.get('/all-users', users);
router.post('/refresh', rateLimit, refresh);

export default router;
