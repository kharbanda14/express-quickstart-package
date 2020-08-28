module.exports = class InvalidCredentials extends Error {
  constructor() {
    super("Email or Password is wrong");
    this.code = 422;
  }
};
