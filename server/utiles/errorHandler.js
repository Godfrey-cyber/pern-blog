import { errorResponse } from "./response.js"

export const errorHandler = async (error, req, res, next) => {
	if (res.headersSent) {
		return next(error)
	}

	return errorResponse(
		res,
		error.status || 500,
		error.message || "Internal Server error",
		process.env.NODE_ENV === "development" ? error.stack : null

	)
}


// -> npx prisma migrate dev --name updated-schemas