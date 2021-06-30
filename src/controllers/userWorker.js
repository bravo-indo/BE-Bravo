const {response} = require("../helpers/standarResponse");
const userModel = require("../models/userWorker");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");
// const { APP_SECRET_KEY} = process.env;


exports.registerWorker = async (req, res) => {
	const errors = validationResult(req);
	const data = req.body;
	if(!errors.isEmpty()){
		return res.status(400).json({ errors: errors.array()[0].msg });
	}else{
		if(data.password === data.confirmation_password){
			data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
			userModel.createUserWorker(data, (err, results) => {
				if(err){
					console.log(err);
					return response(res, 400, false, "Register Failed");
				}else{
					if(results.affectedRows){
						console.log(data);
						return response(res, 200, true, "Register Successfully");
					}else{
						console.log(err);
						return response(res, 400, false, "ann erorr ocured");
					}
				}
			});
		}else{
			return response(res, 400, false, "Password dosent match");
		}
	}
	
};
