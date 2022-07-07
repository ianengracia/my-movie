const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const userService = require("../services/user.service");

const messageConstants = require("../contants/messages.contant");
const WebResponse = require("../models/web-response.model");

const authenticateUser = async (payload, done) => {
  try {
    const username = payload.user?.username;

    if (!username) return done(null, false, { message: messageConstants.AUTHENTICATION_FAILURE });

    const user = await userService.findByUsername(username);

    if (!user) return done(null, false, { message: messageConstants.AUTHENTICATION_FAILURE });

    delete user.password;

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const initialize = (_passport) => {
  const options = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET_KEY };

  _passport.use(new Strategy(options, authenticateUser));
};

const authorize = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user) {
      return res.json(new WebResponse(403, "Unauthorized!"));
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { initialize, authorize };
