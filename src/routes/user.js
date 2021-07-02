

const route = require("express").Router();
const userController = require("../controllers/userWorker");

route.get("/details/portofolio", userController.getPortofolioByUser);
route.get("/details/experience", userController.getExperienceByUser);
route.get("/details", userController.getDetailUserWorker);
// route.get("/", userController.getUserBySkill);



module.exports = route;