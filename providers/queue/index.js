const Queue = require("bull");
const logger = require("../logger");

const activeQueues = {};

module.exports = {
  /**
   * Creates a new Queue
   *
   * @param {string} queueName
   * @param {Function} job
   * @param {object} [options]
   */
  createQueue(queueName, job, options = {}) {
    if (activeQueues[queueName]) {
      throw new Error(`Queue with name "${queueName}" already exists`);
    }
    const createdJob = new Queue(queueName, process.env.REDIS_URL);
    if (typeof job != "function") {
      throw new Error("Job should be a function");
    }
    createdJob.process(job);
    activeQueues[queueName] = createdJob;
    logger.debug(`Created new queue "${queueName}"`);
    return activeQueues[queueName];
  },

  /**
   * Gets active queue
   *
   * @param {string} queueName
   *
   */
  getQueue(queueName) {
    return activeQueues[queueName];
  },
};
