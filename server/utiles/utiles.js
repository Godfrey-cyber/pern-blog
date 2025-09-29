import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { redisClient } from "../redis/redisClient.js"
import Redis from "ioredis"

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
// const redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379")
export const rateLimit = async(req, res, next) => {
  try {
    const ip = req.ip;
    const key = `ratelimit:${ip}`;
    const requests = await redisClient.incr(key);

    if (requests === 1) {
      await redisClient.expire(key, 60); // 1 min window
    }
    if (requests > 10) {
      return res.status(429).json({ error: "Too many requests, slow down!" });
    }
    next()
  } catch (error) {
    console.error("Rate Limit Error:", error)
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