const path = require("path");
const fs = require("fs");

module.exports = class StorageFile {
  constructor(filePath) {
    this.filePath = filePath;
    this._meta = this.parseFile();
  }

  parseFile() {
    return path.parse(this.filePath);
  }

  /**
   * Get filename without extension
   *
   * @returns {string}
   */
  getName() {
    return this._meta.name;
  }

  /**
   * Get filename with extension
   *
   * @returns {string}
   */
  getFileName() {
    return this._meta.base;
  }

  /**
   * Get file extension
   *
   * @returns {string}
   */
  getFileExtension() {
    return this._meta.ext;
  }

  /**
   * Get the directory of file
   *
   * @returns {string}
   */
  getFileDirectory() {
    return this._meta.dir;
  }

  /**
   * Deletes a file
   *
   * @returns {Promise}
   */
  delete() {
    return new Promise((resolve, reject) => {
      fs.unlink(this.filePath, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }

  /**
   * Copy a file to another destination
   *
   * @param {string} destination The destination to move the file
   */
  copy(destination) {
    destination = this.getAbsPath(destination);
    this.createDirIfNotExists(destination);
    return new Promise((resolve, reject) => {
      fs.copyFile(this.filePath, destination, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(new StorageFile(destination));
      });
    });
  }

  /**
   * Creates directory recursively if not present
   *
   * @param {string} filename
   */
  async createDirIfNotExists(filename) {
    const dir = path.dirname(filename);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Gets file contents
   *
   * @param {object} options
   */
  contents(options = {}) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, options, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  /**
   * Gets readable stream of the file.
   *
   */
  readableStream() {
    return fs.createReadStream(this.filePath);
  }
};
