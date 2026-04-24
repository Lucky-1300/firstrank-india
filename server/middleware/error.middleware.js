const notFoundMiddleware = (req, res, next) => {
	const error = new Error(`Route not found: ${req.originalUrl}`);
	error.statusCode = 404;
	error.code = "NOT_FOUND";
	next(error);
};

const errorMiddleware = (error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const code = error.code || (statusCode === 500 ? "INTERNAL_SERVER_ERROR" : "ERROR");

	return res.status(statusCode).json({
		success: false,
		message: error.message || "Something went wrong",
		data: null,
		error: {
			code,
			details: error.details || null,
		},
	});
};

export { notFoundMiddleware, errorMiddleware };
