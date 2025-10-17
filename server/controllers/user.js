import bcrypt from "bcryptjs"
import { prisma } from "../models/prismaClient.js"
import { Role } from "@prisma/client"
import { redisClient, publisher } from "../redis/redisClient.js"
import jwt from "jsonwebtoken"
import { createAccessToken, createRefreshToken, randomTokenId } from "../utiles/utiles.js"
import { successResponse, errorResponse } from "../utiles/response.js"

export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashed, role },
      select: { id: true, username: true, email: true, role: true, password: false }
    });
    return successResponse(res, 201, "User registered successfully", user)
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
   console.log("➡️ Login route hit");
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ msg: '❌ Please fill in all fields' })
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: '❌ User not found' })
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: '❌ Invalid credentials' })
    console.log("✅ Auth successful, preparing tokens");
    // Generate tokens
    const tokenId = randomTokenId();
    const accessToken = createAccessToken(user.id)
    const refreshToken = createRefreshToken(user.id, tokenId)
    const { password: _, ...userSafe } = user;
    await redisClient.set(`refresh:${user.id}:${tokenId}`, '1', 'EX', 7 * 24 * 60 * 60); // 7 days in s
    console.log("➡️ Before res.cookie, headersSent =", res.headersSent);
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days in ms
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    })
    console.log("➡️ Before res.json, headersSent =", res.headersSent);
    return res.status(200).json({ user: userSafe, accessToken });
  } catch (error) {
    next(error);
  }
};

export const users = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true, password: false },
    });
    if (!users) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(users);
  } catch (error) {
    next(error)
  }
};

// @Logout user
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return errorResponse(res, 400, "No refresh token provided");
    }

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Delete from Redis
    await redisClient.del(`refresh:${payload.userId}:${payload.tokenId}`);

    // Clear cookie
    res.clearCookie("refreshToken", {
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    return successResponse(res, 200, "✅ Logged out successfully");
  } catch (error) {
    next(error);
  }
};

export const refresh = async(req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return errorResponse(res, 400, "No refresh token provided");
    }
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
    // @Get loggedin user
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.userId) },
      select: { id: true, email: true, username: true, role: true }
    });
    // @Check if user exists
    if (!user) {
      return errorResponse(res, 400, "No user found");
    }
    // @Check if token exists in cache
    const exists = await redisClient.get(`refresh:${payload.userId}:${payload.tokenId}`);
    if (!exists) {
      return errorResponse(res, 400, `No refresh token in cache or it is invalid - ${payload.userId} - ${exists} - ${payload.tokenId}`);
    }
    // @Issue new tokens
    const tokenId = randomTokenId();
    const accessToken = createAccessToken(payload.userId);
    const refreshToken = createRefreshToken(payload.userId, tokenId);

    // Delete old refresh and store new one
    await redisClient.del(`refresh:${payload.userId}:${payload.tokenId}`);
    await redisClient.set(`refresh:${payload.userId}:${tokenId}`, '1', 'EX', 7 * 24 * 60 * 60);
    // @Send refreshToken
    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ accessToken, user })
  } catch (error) {
    next(error)
  }
}