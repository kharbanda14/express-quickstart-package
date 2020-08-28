module.exports = class ValidationFailed extends Error {
  constructor(data = {}) {
    super("Validation Failed");
    this.code = 422;
    this.data = data;
  }
};
