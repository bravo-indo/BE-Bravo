

const route = require("express").Router();
const userController = require("../controllers/userWorker");
const userRecruiterController = require("../controllers/userRecruiter");
const auth = require("../middlewares/auth");

route.get("/details/portofolios/:id", auth,userController.getPortofolioByUserIdParams);
route.get("/details/portofolio", auth, userController.getPortofolioByUser);
route.get("/details/experiences/:id", auth, userController.getExperienceByUserIdParams);
route.get("/details/experience", auth, userController.getExperienceByUser);
route.put("/details/editprofile", auth, userController.updateUserProfile);
route.patch("/details/editprofile", auth, userController.patchUserWorkerSkills);
route.post("/details/editprofile", auth, userController.postAddUserPortofolios);
route.post("/details/editprofile/experienceWork", auth, userController.postAddUserWorkerExperience);
route.get("/details", auth, userController.getDetailUserWorker);
route.get("/notifikasi", auth, userController.getUserNotifikasiHiring);
// route.get("/", userController.getUserBySkill);

// Recruiter
route.get("/search", userRecruiterController.getSearchBySkill);


route.put("/recruiter/details/editprofile", auth, userRecruiterController.updateUserProfileRecruiter);
route.get("/recruiter/details/:id", auth, userRecruiterController.getDetailUserByIdParams);
route.post("/recruiter/details/:id", auth, userRecruiterController.postHiringUserWorker);


module.exports = route;