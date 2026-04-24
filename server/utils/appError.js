const createAppError = (message, statusCode = 500, code = "INTERNAL_SERVER_ERROR", details = null) => {
	const error = new Error(message);
	error.statusCode = statusCode;
	error.code = code;
	error.details = details;
	return error;
};

export { createAppError };