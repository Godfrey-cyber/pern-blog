import { RedisStore } from "connect-redis"
import session from "express-session"
import { redisClient } from "./redisClient.js"

const store = new RedisStore({
  client: redisClient,
  prefix: "sess:",
  ttl: 7 * 24 * 60 * 60
});

export const sessionMiddleware = session({
  store,
  secret: process.env.SESSION_SECRET || 'wef435v5465654ytu7j64n64657j6487653v676j8',
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
});