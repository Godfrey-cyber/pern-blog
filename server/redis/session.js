import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redis } from './redisClient.js';

// const RedisStore = connectRedis(session);

export const sessionMiddleware = session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  }
});