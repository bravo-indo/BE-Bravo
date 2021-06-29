const express = require("express");
const mainRouter = express.Router();
const welcomeRouter = require("./welcome");

mainRouter.use("/", welcomeRouter);