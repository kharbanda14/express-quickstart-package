const nodeCache = require("node-cache");

const cacheStorage = new nodeCache();

module.exports = {
  set(key, value, ttl) {
    return cacheStorage.set(key, value, ttl);
  },
  get(key, callback = null) {
    if (!cacheStorage.has(key) && typeof callback == "function") {
      return callback();
    }
    return cacheStorage.get(key);
  },
  take(key) {
    return cacheStorage.take(key);
  },
  remove(...key) {
    return cacheStorage.del(key);
  },
  flush() {
    return cacheStorage.flushAll();
  },
  instance() {
    return cacheStorage;
  },
};
