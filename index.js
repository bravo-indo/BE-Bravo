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
const userRouter = require("./src/routes/user");
const auth = require("./src/middlewares/auth");
const homeRouter = require("./src/routes/home");

app.use("/auth", authRouter);
app.use("/skill", skillRouter);
app.use("/user", auth, userRouter);
app.use("/home", homeRouter);

app.listen(8080, () => {
	console.log("App Running on Port 8080");
});

// app.use("/", mainRouter);

// module.exports = app;