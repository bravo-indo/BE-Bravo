const skillsModel = require("../models/skills");
const {response } = require("../helpers/standarResponse");

exports.getSkills = (req, res) => {
	skillsModel.getVariants((err, results) => {
		if (!err) {
			return response(res, 200, "List of variants", results);
		} else {
			return response(res, 500, "An error occured");
		}
	});
};

exports.addSkills = (req, res) => {
	skillsModel.addVariants(req.body, (err) => {
		if (!err) {
			return response(res, 200, "Create variants has been successfully!");
		} else {
			return response(res, 400, "Bad Request!");
		}
	});
};