const {response} = require("../helpers/standarResponse");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const { APP_SECRET_KEY} = process.env;
const nodemailer = require("nodemailer");

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
					return response(res, 400, "Register Failed");
				} else {
					if (results.affectedRows) {
						console.log(data);
						return response(res, 200, "Register Successfully");
					} else {
						console.log(err);
						return response(res, 400, "ann erorr ocured");
					}
				}
			});
		} else {
			return response(res, 400, "Password dosent match");
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

exports.forgotPassword = (req, res) => {
	const {
		email
	} = req.body;
	// const data = req.body;
	// const {tokenForgot} = req.params;
	// const bearerToken = req.header("x-access-token");
	// console.log(bearerToken);
	userModel.checkEmailForgot(email, async (err, results) => {
		if (!err) {
			// const user = results[0];
			// userModel.createTokenForgot(data, (err, results) => {
			// 	data.token = jwt.sign({
			// 		id: user.id,
			// 		email: user.email
			// 	}, APP_SECRET_KEY, {
			// 		expiresIn: "1h"
			// 	});
			// 	const tokenForgot
			// 	// const bearerToken = req.header("x-access-token");
			// 	// data.token = {
			// 	// 	token: bearerToken.split(" ")[1]
			// 	// };
			// 	console.log(data.token);
			// 	return response(res, 200, "Your link has been sent in your mail!", results);
			// });
			if (results[0]) {
				//Nodemailer: 
				let transporter = nodemailer.createTransport({
					service: "gmail",
					host: "smtp.gmail.com",
					port: 578,
					secure: false,
					auth: {
						user: process.env.USER_EMAIL,
						pass: process.env.PASS_EMAIL
					}
				});

				let mailOptions = {
					from: "<noreply@gmail.com>",
					to: req.body.email,
					subject: "Generate Link for Reset Password from BravoTeam",
					html: ` <h3> Link  to Reset Password </h3>
                            <p> Hello, this is your link: ${process.env.APP_URL}/auth/reset-password/recruiter/${email} </p>`
				};
				transporter.sendMail(mailOptions, (err) => {
					if (err) {
						console.log("Its Error: ", err);
					} else {
						console.log("Sent Success!!!!");
					}
				});
				return response(res, 200, "Your link has been sent in your mail!");
			} else {
				return response(res, 404, "Your email is not found!");
			}
			
		} else {
			return response(res, 401, "Bad Request!");
		}
	});
};
exports.getResetPassword = (req, res) => {
	// const {tokenForgot} = req.params;
	// const decodedToken = jwt.verify(tokenForgot, process.env.APP_SECRET_KEY);
	// const email = decodedToken.email;
	const {email} = req.params;
	userModel.checkEmailForgot(email, (err, results) => {
		if(!err) {
			return response(res, 200, true, "GET Reset Password Successfully");
		}
		else {
			console.log(results);
			return response(res, 400, false, "ann erorr ocured");
		}
	});
};
exports.resetPassword = async (req, res) => {
	// const {token} = req.params.tokenForgot;
	// const decodedToken = jwt.verify(token, process.env.APP_SECRET_KEY);
	// const email = decodedToken.email;

	const{email} = req.params;
	const saltRounds = await bcrypt.genSalt(10);
	const errors = validationResult(req);
	console.log(req.body);
	if(!errors.isEmpty()){
		return res.status(400).json({
			errors: errors.array()[0].msg
		});
	}
	else {
		if(req.body.password === req.body.confirmation_password) {
			req.body.password = await bcrypt.hash(req.body.password, saltRounds);
			userModel.resetPassword(email, req.body.password, (err, results) => {
				if(err){
					console.log(err);
					return response(res, 400, false, "Reset Password Failed");
				}
				else {
					if(results.affectedRows) {
						console.log(req.body);
						return response(res, 200, true, "Reset Password Successfully");
					}
					else {
						console.log(req.body);
						return response(res, 400, false, "ann erorr ocured");
					}
				}
			});
		}
		else {
			return response(res, 400, false, "Password doesn't match");
		}
	}

};