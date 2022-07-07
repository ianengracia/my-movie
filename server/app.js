if (process.env.NODE_ENV !== "production") require("dotenv").config();

var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var passport = require("passport");

var app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

/*******************************************************
 *
 * ------------- PASSPORT & SESSION SETUP ------------------
 *
 *******************************************************/
require("./config/passport.config").initialize(passport);

/*******************************************************
 *
 * ------------- ROUTERS ------------------
 *
 *******************************************************/
const routers = require("./routers");

app.use("/api", routers.indexRouter);
app.use("/api/users", routers.usersRouter);
app.use("/api/movies", routers.moviesRouter);

// error handler
app.use(function (err, req, res, next) {
  res.json({ err });
});

module.exports = app;
