const {
	response
} = require("../helpers/standarResponse");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const {
	validationResult
} = require("express-validator");
const jwt = require("jsonwebtoken");
const { APP_SECRET_KEY} = process.env;


exports.registerRecruiter = async (req, res) => {
	const errors = validationResult(req);
	const data = req.body;
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()[0].msg
		});
	} else {
		if (data.password === data.confirmation_password) {
			data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
			userModel.createUserRecruiter(data, (err, results) => {
				if (err) {
					console.log(err);
					return response(res, 400, false, "Register Failed");
				} else {
					if (results.affectedRows) {
						console.log(data);
						return response(res, 200, true, "Register Successfully");
					} else {
						console.log(err);
						return response(res, 400, false, "ann erorr ocured");
					}
				}
			});
		} else {
			return response(res, 400, false, "Password dosent match");
		}
	}

};

exports.login = (req, res) => {
	const {
		email,
		password
	} = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return response(res, errors.array()[0].msg, null, 400);
	}
	userModel.getUserByEmail(email, async (err, results) => {
		if (err) throw err;
		if (results.length < 1) return response(res, 404, "Email not found!");
		const user = results[0];
		console.log(user.id);
		const compare = await bcrypt.compare(password, user.password);
		if (compare) {
			const token = jwt.sign({
				id: user.id,
				email: user.email
			}, APP_SECRET_KEY, {
				expiresIn: "1h"
			});
			return response(res, 200, "Login Success!", {
				token
			});
		} else {
			return response(res, 401, "Wrong email or password!");
		}
	});
};