import Redis from "ioredis"

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(REDIS_URL, {
	maxRetriesPerRequest: null, // disable retry limit errors
  	enableReadyCheck: true, // ensures connection is ready before use
  	retryStrategy: (attempt) => {
	    if (attempt > 5) return null;            // stop after 5 attempts
	    return Math.min(attempt * 200, 2000);    // 200ms, 400ms, ... up to 2s
  	},
  	reconnectOnError: (err) => {
	    if (err?.message?.includes("READONLY")) return true;
	    return false;
	},
	enableReadyCheck: true,
	enableOfflineQueue: false,
  	connectTimeout: 10_000,
});

redis.on('connect', () => console.log('Connected to Redis! 💯'));
redis.on('error', err => console.error('Redis error:', err));