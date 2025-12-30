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
    // if (req.path === '/users/refresh') {
    //   return next();
    // }
    const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || req.socket.remoteAddress;
    // Rate limit per route
    const routeLimits = {
      '/users/login': process.env.NODE_ENV === 'production' ? 10 : 100,      // 10 login attempts per minute
      '/users/signup': process.env.NODE_ENV === 'production' ? 5 : 100,       // 5 signup attempts per minute
      '/users/refresh': process.env.NODE_ENV === 'production' ? 60 : 100,     // 60 refresh attempts per minute
      'default': 30
    };

    const route = req.path;
    const limit = routeLimits[route] || routeLimits.default;

    const key = `ratelimit:${ip}:${route}`;
    const requests = await redisClient.incr(key);
    console.log(`🔍 Rate limit check: IP=${ip}, Requests=${requests}, Path=${req.path}`);

    // const limit = process.env.NODE_ENV === 'production' ? 30 : 100;
    if (requests === 1) {
      await redisClient.expire(key, 60); // 1 minute window
    }

    console.log(`🔍 Rate limit: IP=${ip}, Route=${route}, Requests=${requests}/${limit}`);
    if (requests > limit) {
      console.log(`❌ Rate limit exceeded for ${ip} on ${route}`);
      return res.status(429).json({ 
        error: "Too many requests, slow down!",
        retryAfter: 60,
        requestCount: requests,
        limit: limit
      });
    }
    next();
  } catch (error) {
    console.error("Rate Limit Error:", error)
    next();
  }
}