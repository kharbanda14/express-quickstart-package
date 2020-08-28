const passport = require("passport");
const jwt = require("./strategy/jwt");

passport.use(jwt);

module.exports = passport;
