const { response } = require("../helpers/standardResponse");
const jwt = require("jsonwebtoken");
const { APP_KEY } = process.env;

const auth = (req, res, next) => {
	if (req.headers?.authorization) {
		if (req.headers.authorization.startsWith("Bearer")) {
			try {
				const token = req.headers.authorization.slice(7);
				const user = jwt.verify(token, APP_KEY);
				req.authUser = user;
				next();
			} catch (err) {
				return response(res, 401, false, "Session Expired, You must be Login!");
			}
		}
	} else {
		return response(res, 401, false, "Auth Token Needed");
	}
};
module.exports = auth;
