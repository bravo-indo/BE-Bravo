const express = require("express");
const mainRouter = express.Router();
const welcomeRouter = require("./home");

mainRouter.use("/", welcomeRouter);