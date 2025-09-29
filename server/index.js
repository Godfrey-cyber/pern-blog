import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { sessionMiddleware } from "./redis/session.js"
import { errorHandler } from "./utiles/errorHandler.js"
import { logger } from "./logs/logger.js"

//Routes
import userRoutes from "./routes/user.js"
import blogRoutes from "./routes/blog.js"
import commentRoutes from "./routes/comment.js"
import categoryRoutes from "./routes/category.js"

dotenv.config()
const app = express();
app.use(morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(express.json())
app.use(sessionMiddleware)
app.use(cookieParser())
const allowedOrigins = ['https://alx-tour-destination.vercel.app', 'http://localhost:5500']

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error('CORS not allowed from this origin ->: ' + origin))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).send("Something broke!");
});
logger.info("Server started");
logger.error("An error occurred");

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/blogs', blogRoutes)
app.use('/api/v1/comment', commentRoutes)
app.use('/api/v1/category', categoryRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000 || process.env.npm_package_config_port;

console.log(PORT)

app.listen(PORT, () => {
  console.log(`Success 💯! Servers running on port: ${PORT} 📡`)
});