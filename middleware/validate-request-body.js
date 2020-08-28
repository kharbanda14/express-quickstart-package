const ValidationFailed = require("../exceptions/ValidationFailed");
const joi = require("../providers/validator");
module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      const data = await schema(joi).validateAsync(req.body);
      req.body = data;
      next();
    } catch (error) {
      const formatted = {};
      error.details.forEach((detail) => {
        formatted[detail.path[0]] = detail.message;
      });
      next(new ValidationFailed(formatted));
    }
  };
};
