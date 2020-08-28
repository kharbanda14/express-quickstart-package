const cache = require("../providers/cache");

module.exports = function cacheRequest(duration, mode = "public") {
  return (req, res, next) => {
    if (req.method != "GET") {
      return next();
    }

    let key = ["REQUEST"];
    if (mode == "private" && req.user) {
      key.push(req.user._id);
    }
    key.push(req.originalUrl);
    key = key.join(":");

    const cachedContent = cache.get(key);
    if (cachedContent) {
      return res.send(cachedContent);
    }

    res.sendResponse = res.send;
    res.send = (data) => {
      cache.set(key, data, duration);
      res.sendResponse(data);
    };
    next();
  };
};
