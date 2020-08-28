const pug = require("pug");
const path = require("path");

const compliedCache = {};

const pugOptions = {
  basedir: path.join(process.cwd(), "app/views"),
  filters: require("./filters"),
};
module.exports.render = (fileName, data = {}) => {
  if (compliedCache[fileName]) {
    return compliedCache[fileName](data);
  }
  compliedCache[fileName] = pug.compileFile(
    path.join(pugOptions.basedir, fileName),
    pugOptions
  );
  return compliedCache[fileName](data);
};
