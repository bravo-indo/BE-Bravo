const {response} = require("../helpers/standarResponse");
const userModel = require("../models/users");
const skillModel = require("../models/skills");
const hireModel = require("../models/hire")
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
					return response(res, 400, false, "ann erorr ocured");
				}else{
					if(results.affectedRows){
						console.log(data);
						return response(res, 200, true, "Register Successfully");
					}else{
						console.log(err);
						return response(res, 400, false, "Register Failed");
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
      results.forEach(data => {   
      if (data.portofolios !== null && !data.portofolios.startsWith("http")) {
				data.portofolios = `${process.env.APP_URL}${data.portofolios}`;
			}
      })
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



exports.patchUserWorkerSkills = (req, res) => {
	const {name} = req.body
  const data = {name, id_user : req.authUser.id}
	userModel.getUserWorkerById(req.authUser.id, (err, results) => {
		if(err){
			return response(res, 400, false, "You dont have permission to accsess this resource");
		}else{
      if(results[0].type_users === "worker"){
        skillModel.addSkills(data, (err, results) => {
          if(err){
            console.log(err);
            return response(res, 400, false, "an errors occured" );
          }else{
            if (results.affectedRows) {
              return response(res, 200, true, "Add New Skills Successfully", data);
            } else {
              return response(res, 401, false, 'Failed to Add New Skills')
            }
          }
        });
      }else{
        return response(res, 400, false, "You Must be Login as Worker to access this resource");
      }
		}
	});
};

const portoFile = require("../helpers/upload").single("portofolio_file")

exports.postAddUserPortofolios = (req, res) => {
	userModel.getUserWorkerById(req.authUser.id, (err, results) => {
		if(err){
			return response(res, 400, false, "You dont have permission to accsess this resource");
		}else{
      if(results[0].type_users === "worker"){
        portoFile(req, res, err =>{
					if(err){
						console.log(err);
						return response(res, 402, false, "Ann Error Occured on uploads image");
					}else{
						req.body.portofolio_file= req.file ? `${process.env.APP_UPLOAD_ROUTE}/${req.file.filename}` : null;
						const {project_name, repository, type_project, portofolio_file} = req.body
            const data = {id_user : req.authUser.id, project_name, repository, type_project, portofolio_file}
						userModel.postUserWorkerPortofolio(data, (err, results) => {
							if (err) {
								console.log(err);
								return response(res, 500, false, "an Error accurred");
							} else {
                if (results.affectedRows) {
                  return response(res, 200, true, "Portofolio Updated Sucsessfully", data);
                } else {
                  return response(res, 401, false, 'Portofolio Updated Failed')
                }
							}
						});
					}
				});
      }else{
        return response(res, 400, false, "You Must be Login as Worker to access this resource");
      }
		}
	}); 
}

exports.postAddUserWorkerExperience = (req, res) => {
	const {company_name, position, month_years, description} = req.body
  const data = {id_user : req.authUser.id, company_name, position, month_years, description}
	userModel.getUserWorkerById(req.authUser.id, (err, results) => {
		if(err){
			return response(res, 400, false, "You dont have permission to accsess this resource");
		}else{
      if(results[0].type_users === "worker"){
        userModel.postUserWorkerExperience(data, (err, results) => {
          if(err){
            console.log(err);
            return response(res, 400, false, "Add New Working Experience Failed" );
          }else{
            if (results.affectedRows) {
              return response(res, 200, true, "Add New Working Experience Successfully", data);
            } else {
              response(res, 401, false, 'Failed to Add New  Working Experience')
            }
          }
        });
      }else{
        return response(res, 400, false, "You Must be Login as Worker to access this resource");
      }
		}
	});
};

exports.getUserNotifikasiHiring = (req, res) => {
  userModel.getUserWorkerById(req.authUser.id, (err, results) => {
    if(err){
			return response(res, 400, false, "You dont have permission to accsess this resource");
		}else{
      if(results[0].type_users === "worker"){
        hireModel.getNotifikasiHiring(req.authUser.id, (err, results) => {
          if(err){
            return response(res, 400, false, "an Error Occured")
          }else{
            if(results.length <= 0){
             return response(res, 400, false, "You dont have Hiring Request")
            }else{
              return response(res, 200, true, "Your List Request Hiring From Recruiter", results);
            }
          }
        })
      }else{
        return response(res, 400, false, "You Must be Login as Worker to access this resource")
      }
    }
  }) 
}