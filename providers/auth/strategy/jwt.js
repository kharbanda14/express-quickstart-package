const { Strategy, ExtractJwt } = require("passport-jwt");
const models = require("../../models");

module.exports = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET,
  },
  async (payload, done) => {
    try {
      const User = await models.User.findById(payload.sub);
      done(null, User);
    } catch (error) {
      done(error, false);
    }
  }
);
