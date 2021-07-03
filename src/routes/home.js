const userController = require("../controllers/userWorker");

const route = require("express").Router();


route.get("/", userController.getListUserWorker);

module.exports = route;