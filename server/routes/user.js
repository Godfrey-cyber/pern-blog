import express from "express";
const router = express.Router();
import { signup, login, users, refresh } from "../controllers/user.js";

router.post('/signup', signup);
router.post('/login', login);
router.get('/all-users', users);
router.post('/refresh', refresh);

export default router;
