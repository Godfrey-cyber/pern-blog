import express from "express";
const router = express.Router();
import { rateLimit } from "../utiles/utiles.js"
import { signup, login, users, refresh, logout } from "../controllers/user.js";

router.post('/signup', signup);
router.post('/login', rateLimit, login);
router.post('/logout', rateLimit, logout);
router.get('/all-users', users);
router.get('/refresh', rateLimit, refresh);

export default router;
