require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const mainRouter = require("./src/routes/index");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const authRouter = require("./src/routes/auth");
const skillRouter = require("./src/routes/skills");
// const auth = require("./src/middlewares/auth");

app.use("/auth", authRouter);
app.use("/skill", skillRouter);

app.listen(8080, () => {
	console.log("App Running on Port 8080");
});

// app.use("/", mainRouter);

// module.exports = app;