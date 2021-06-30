exports.response = (res, status = 200, succsess = true, message = "this is message", results, pageInfo) => {
	return res.status(status).json({
		status,
		succsess,
		message,
		results,
		pageInfo
	});
};
