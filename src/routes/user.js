

const route = require("express").Router();
const userController = require("../controllers/userWorker");
const userRecruiterController = require("../controllers/userRecruiter");

route.get("/details/portofolio", userController.getPortofolioByUser);
route.get("/details/experience", userController.getExperienceByUser);
route.get("/details", userController.getDetailUserWorker);
// route.get("/", userController.getUserBySkill);
// Recruiter
route.get("/search", userRecruiterController.getSearchBySkill);


module.exports = route;