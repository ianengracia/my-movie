const express = require("express");
const passportConfig = require("../config/passport.config");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.get("/profile", passportConfig.authorize, usersController.profile);

module.exports = router;
