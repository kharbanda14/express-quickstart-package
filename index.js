const logger = require("./providers/logger");
const auth = require("./providers/auth");
const cache = require("./providers/cache");
const response = require("./providers/responses");
const scheduler = require("./providers/scheduler");
const storage = require("./providers/storage");
const view = require("./providers/view");
const events = require("./providers/events");
const email = require("./providers/email");
const exceptions = require("./exceptions");
const middleware = require("./middleware");
const models = require("./providers/models");
const queue = require("./providers/queue");
const validator = require("./providers/validator");

module.exports = {
  logger,
  auth,
  cache,
  response,
  scheduler,
  storage,
  view,
  events,
  email,
  exceptions,
  middleware,
  models,
  queue,
  validator,
};
