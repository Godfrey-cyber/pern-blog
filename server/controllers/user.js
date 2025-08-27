// const prisma = require('../models/prismaClient');
import bcrypt from "bcryptjs"
import { prisma } from "../models/prismaClient.js"
import { Role } from "@prisma/client"
import { redis } from "../redis/redisClient.js"
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
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: '❌ Please fill in all fields' })
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return errorResponse(res, 404, "User not found")

    const match = await bcrypt.compare(password, user.password);
    if (!match) return errorResponse(res, 401, "Invalid credentials")

    // Generate tokens
    const tokenId = randomTokenId();
    const accessToken = createAccessToken(user.id)
    const refreshToken = createRefreshToken(user.id)

    const { password: _, ...userSafe } = user;
    await redis.set(`refresh:${user.id}:${tokenId}`, 1, 'EX', 7 * 24 * 60 * 60); //
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      maxAge: 86400000,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    })
    res.status(200).json({ user: userSafe, accessToken });
  } catch (error) {
    next(error)
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


export const refresh = async(res, req, next) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = verifyRefreshToken(token);
      await redis.del(`refresh_token:${payload.id}:${payload.tokenId}`);
    } catch (error) {
      errorResponse(res, 403, "Invalid token, try again!")
    }
  }
  res.clearCookie('refreshToken', {
    path: '/api/v1/users/refresh',
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out' });
  successResponse(res, 200, 'successfully logged out')
}