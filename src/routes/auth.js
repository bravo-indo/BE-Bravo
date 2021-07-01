const userWorkerController = require("../controllers/userWorker");


const route = require("express").Router();
const validator = require("../helpers/validationRegister");
const validatorLogin = require("../helpers/validationLoginworker");
const {checkSchema} = require("express-validator");

route.post("/register/worker", checkSchema(validator),  userWorkerController.registerWorker);
route.post("/login/worker", checkSchema(validatorLogin), userWorkerController.LoginUserWorker);
 
module.exports = route;