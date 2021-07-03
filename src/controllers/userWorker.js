const {response} = require("../helpers/standarResponse");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { APP_SECRET_KEY, APP_URL} = process.env;


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
	userModel.getUserByEmail(email, async (err, results) => {
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
	const {id} = req.params;
	const pageInfo = {};
	const cond = req.query;
	cond.search = cond.q || "";
	cond.limit = cond.limit || 5;
	cond.offset = cond.offset || 0;
	cond.order = cond.sortBy || "Name_Worker";
	cond.value = cond.value || "asc";
	cond.page = cond.page || 1;
	cond.offset = (cond.page - 1) * cond.limit;
	userModel.getCountWorker(cond, (err, data) => {
		const totalData = data[0].total_worker;
		const lastPage = Math.ceil(totalData / cond.limit);
		pageInfo.totalData = totalData;
		pageInfo.currentPage = cond.page;

		console.log("total data: ", totalData);
		console.log(pageInfo);
		console.log(cond.limit);
		pageInfo.lastPage = lastPage;
		pageInfo.nextPage =
			cond.page < lastPage ?
				`${APP_URL}/home?page=${cond.page + 1}` :
				null;
		pageInfo.prevPage =
			cond.page > 1 ?
				`${APP_URL}/home?page=${cond.page - 1}` :
				null;
		userModel.getAllUserWorker(cond, id, (err, results) => {
			if (!err) {
				return response(res, 200, "List of Worker", results, pageInfo);
			} else {
				console.error(err);
				return response(res, 500, "Ann Error Ooccured!");
			}
		});
	});
};

exports.getDetailUserWorker = (req, res) =>{
	userModel.getUserWorkerDetail(req.authUser.id, (err, results) => {
		if(err){
			console.log(err);
			return response(res, 400, false, "you don't have permission to accsess this resorce");
		}else{
			const data = {
				id: 0,
				name: "",
				job_desk: "",
				address: "",
				working_time: "",
				user_description: "",
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