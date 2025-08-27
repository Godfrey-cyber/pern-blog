import jwt from 'jsonwebtoken'
import crypto from 'crypto'

//Create Access Token
export const createAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	})
}

//Create Refresh Token
export const createRefreshToken = (userId) => {
	return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	})
}

export const randomTokenId = () => {
  return crypto.randomBytes(32).toString('hex');
}

// Simple slugify utility
export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");