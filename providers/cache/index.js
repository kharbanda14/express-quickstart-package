const availableDrivers = ["node-cache"];
const cacheDriver = process.env.CACHE_DRIVER || availableDrivers[0];

const driver = require(`./drivers/${cacheDriver}`);

module.exports = driver;
