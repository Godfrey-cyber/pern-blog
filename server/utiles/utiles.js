import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { redis } from "../redis/redisClient.js"

//Create Access Token
export const createAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	})
}

//Create Refresh Token
export const createRefreshToken = (userId, tokenId) => {
	return jwt.sign({ userId, tokenId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	})
}

export const randomTokenId = () => {
  return crypto.randomBytes(32).toString('hex');
}

export const rateLimit = async(req, res, next) => {
	const ip = req.ip;
  const key = `ratelimit:${ip}`;
  const requests = await redis.incr(key);

  if (requests === 1) {
    await redis.expire(key, 60); // 1 min window
  }

  if (requests > 10) {
    return res.status(429).json({ error: "Too many requests, slow down!" });
  }

  next();
}

// Simple slugify utility
export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");