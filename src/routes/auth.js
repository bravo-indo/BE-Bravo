const userWorkerController = require("../controllers/userWorker");


const route = require("express").Router();
const validator = require("../helpers/validationLogin");
const {checkSchema} = require("express-validator");

route.post("/register/worker", checkSchema(validator),  userWorkerController.registerWorker);
 
module.exports = route;