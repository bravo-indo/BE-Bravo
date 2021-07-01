exports.response = (res, status = 200, message = "this is message", succsess = true, results, pageInfo) => {
	return res.status(status).json({
		status,
		succsess,
		message,
		results,
		pageInfo
	});
};
