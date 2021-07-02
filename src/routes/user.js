

const route = require("express").Router();
const userController = require("../controllers/userWorker");
const userRecruiterController = require("../controllers/userRecruiter")

route.get("/details/portofolio", userController.getPortofolioByUser);
route.get("/details/experience", userController.getExperienceByUser);
route.put("/details/editprofile", userController.updateUserProfile);
route.patch("/details/editprofile", userController.patchUserWorkerSkills);
route.post("/details/editprofile", userController.postAddUserPortofolios);
route.post("/details/editprofile/experienceWork", userController.postAddUserWorkerExperience);
route.get("/details", userController.getDetailUserWorker);
// route.get("/", userController.getUserBySkill);

// User recruiter bellow this line

route.put("/recruiter/details/editprofile", userRecruiterController.updateUserProfileRecruiter);


module.exports = route;