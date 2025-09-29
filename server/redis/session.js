import { RedisStore } from "connect-redis"
import session from "express-session"
import { redisClient } from "./redisClient.js"

// Create Redis store
// const RedisStore = connectRedis(session)

const store = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});

export const sessionMiddleware = session({
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
});