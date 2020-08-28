const nodeSchedule = require("node-schedule");
const logger = require("../logger");

const runningJobs = {};

module.exports = {
  scheduler: nodeSchedule,
  addJob(name, interval, callback) {
    if (runningJobs[name]) {
      throw new Error(`Job with name "${name}" already exists.`);
    }
    runningJobs[name] = nodeSchedule.scheduleJob(interval, callback);
    logger.debug(`Added new job "${name}" with value of "${interval}"`);
    return runningJobs[name];
  },
  getJob(name) {
    return runningJobs[name];
  },
};
