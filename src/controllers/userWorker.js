const {response} = require("../helpers/standarResponse");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const timeHelper = require("../helpers/date");
const { APP_SECRET_KEY} = process.env;


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

exports.LoginUserWorker = (req, res) => {
	const {email, password} = req.body;
	userModel.getUserWorkerByEmail(email, async (err, results) => {
		if(err){
			console.log(err);
			return response(res, 400, false, "Email not yet registered");
		}else{
			if(results.length < 1){
				return response(res, 400, false, "Wrong Email or Password !");
			}else{
				const user = results[0];
				const compare = await bcrypt.compare(password, user.password);
				if (compare) {
					const payload = { id: user.id, email: user.email };
					const token = jwt.sign(payload, APP_SECRET_KEY);
					return response(res, 200, true, "Login SuccsessFully", { token });
				} else {
					return response(res, 401, false, "Wrong email or password!");
				}
			}
		}
	});
};

exports.getListUserWorker = (req, res) => {
	userModel.getUserList((err, results) => {
		if(err){
			return response(res, 400, false, "an Error occurred");
		}else{
			return response(res, 400, true, "List of User Worker", results);
		}
	});
};

exports.getUserBySkill = (req, res) => {
	const cond = req.query.search || "";
	userModel.searchUserBySkill(cond, (err, results) => {
		if(err){
			console.log(err);
			return response(res, 400, false, "an error on search");
		}else{
			return response(res, 200, true, "list user", results);
		}
	}); 
};

exports.getDetailUserWorker = (req, res) =>{
	userModel.getUserWorkerDetail(req.authUser.id, (err, results) => {
		if(err){
			console.log(err);
			return response(res, 400, false, "you don't have permission to accsess this resorce");
		}else{
			const users = results[0];
			if (users.images !== null && !users.images.startsWith("http")) {
				users.images = `${process.env.APP_URL}${users.images}`;
			}
			const data = {
				id: 0,
				name: "",
        type_users: "",
				job_desk: "",
				address: "",
				working_time: "",
				description: "",
				...results[0],
				skills: [],
			};
			results.forEach(point => {
				data.skills.push({
					skillName : point.skills, 
				});
			});
			return response(res, 200, true, "Your Profile", data);
		}
	});
};

exports.getPortofolioByUser = (req, res) => {
	userModel.getPortoFolioUser(req.authUser.id, (err, results) => {
		if(results.length <= 0){
			return response(res, 400, false, "You dont have permission to access this resource");
		}else{
			return response(res, 200, true, "List Your Portofolio", results);
		}
	});
};

exports.getExperienceByUser = (req, res) => {
	userModel.getExperienceUser(req.authUser.id, (err, results) => {
		if(results.length <= 0){
			return response(res, 400, false, "You dont have permission to access this resource");
		}else{
			return response(res, 200, true, "List Your experience", results);
		}
	});
};

const userPicture = require("../helpers/upload").single("images");

exports.updateUserProfile = (req, res) => {
	userModel.getUserWorkerById(req.authUser.id, (err, results) => {
		if(err){
			return response(res, 402, false, "You dont have permission to accsess this resource");
		}else{
			if(results.length <= 0){
				return response(res, 402, false, "Ann Error Occured");
			}else{
				userPicture(req, res, err =>{
					if(err){
						console.log(err);
						return response(res, 402, false, "Ann Error Occured on uploads image");
					}else{
						req.body.images = req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null;
						const {name, images, job_desk, address, company_name, description} = req.body;
						const data = { id: req.authUser.id, name, images, job_desk, address, company_name, description, updated_time: timeHelper.date()};
						userModel.UpdateUserWorker(data, (err, results) => {
							if (err) {
								console.log(err);
								return response(res, 500, false, "an Error accurred");
							} else {
								console.log(req.body);
								return response(res, 200, true, "Profile Updated Sucsessfully", data);
							}
						});
					}
				});
			}
		}
	});
};