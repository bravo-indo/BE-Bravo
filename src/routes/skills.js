const skillsController = require("../controllers/skills");

const route = require("express").Router();


route.get("/", skillsController.getSkills);
route.post("/", skillsController.addSkills);

module.exports = route;