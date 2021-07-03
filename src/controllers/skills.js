const skillsModel = require("../models/skills");
const {response } = require("../helpers/standarResponse");

exports.getSkills = (req, res) => {
	skillsModel.getVariants((err, results) => {
		if (!err) {
			return response(res, 200, "List of skills", results);
		} else {
			return response(res, 500, "An error occured");
		}
	});
};

exports.addSkills = (req, res) => {
	skillsModel.addVariants(req.body, (err) => {
		if (!err) {
			return response(res, 200, "Create skills has been successfully!");
		} else {
			return response(res, 400, "Bad Request!");
		}
	});
};