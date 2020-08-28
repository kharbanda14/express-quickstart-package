const passport = require("../providers/auth");

module.exports = () => {
  return passport.authenticate("jwt", { session: false });
};
