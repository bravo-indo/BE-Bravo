const userWorkerController = require("../controllers/userWorker");
const userRecruiterController = require("../controllers/userRecruiter");

const route = require("express").Router();
const validator = require("../helpers/auth/validationRegister");
const validatorRecruiter = require("../helpers/auth/validationRegisterRecruiter");
const validatorLogin = require("../helpers/auth/validationLogin");
const {checkSchema} = require("express-validator");

route.post("/register/worker", checkSchema(validator),  userWorkerController.registerWorker);
route.post("/register/recruiter", checkSchema(validatorRecruiter), userRecruiterController.registerRecruiter);
route.post("/login/recruiter", checkSchema(validatorLogin), userRecruiterController.login);
route.post("/forgot-password/recruiter", userRecruiterController.forgotPassword);
route.get("/reset-password/recruiter/:email", userRecruiterController.getResetPassword);
route.patch("/reset-password/recruiter/:email", userRecruiterController.resetPassword);
module.exports = route;