const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

module.exports = function (schema, options) {
  schema.pre("save", async function (next) {
    try {
      const hashedPassword = await bcryptjs.hash(
        this.password,
        await bcryptjs.genSalt(10)
      );
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

  schema.methods.validatePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
  };

  schema.methods.generateAccessToken = function () {
    return jsonwebtoken.sign(
      {
        sub: this._id,
        iat: Date.now(),
      },
      process.env.APP_SECRET
    );
  };

  // remove password when serializing to JSON
  if (!schema.options.toJSON) schema.options.toJSON = {};
  schema.options.toJSON.transform = function (doc, ret) {
    delete ret.password;
    return ret;
  };
};
