import jwt from 'jsonwebtoken'
import { prisma } from "../models/prismaClient.js"
import { errorResponse, successResponse } from "../utiles/response.js"

export const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) return errorResponse(res, 401, "Access token required")
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
			if (error) return errorResponse(res, 403, "Access token required", error)
			req.userId = decoded.userId
			console.log(req)
			next()
		})
	} catch (error) {
		return errorResponse(res, 401, "Access token required or something went wrong", error)
	}
}

export const restrictTo = (...roles) => {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) return errorResponse(res, 401, "Access token required")

			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
				if (error) return errorResponse(res, 403, "Access token required", error)

				// Attach user data to request
				req.userId = decoded.userId

				// Find the user in the database
				const user = await prisma.user.findUnique({
					where: { id: req.userId }
				})
				if (!user) return errorResponse(res, 404, "User not found", error)
				// Check if user has required role
				if (!roles.includes(user.role)) {
					return errorResponse(res, 403, `Access denied. You do not have the required role, you are a ${user.role}.`, error)
				}

				// If everything is okay, proceed to the next middleware
				next()
			})
		} catch (error) {
			return res.status(401).json({ msg: error.message })
		}
	}
}

// 