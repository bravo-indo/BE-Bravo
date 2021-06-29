const express = require("express");
const welcomeRouter = express.Router();


welcomeRouter.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Backend is Running Well"
	});
});

module.exports = welcomeRouter;