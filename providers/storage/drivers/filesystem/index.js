const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const StorageFile = require("./File");

class FileSystemStorage {
  constructor() {
    this.folder = process.env.FILESYSTEM_STORAGE;
    this.basePath = path.join(process.cwd(), this.folder);
  }

  async writeFile(filename, data) {
    return new Promise(async (resolve, reject) => {
      await this.makeDirectory(path.dirname(filename));
      fs.writeFile(this.getAbsPath(filename), data, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(new StorageFile(this.getAbsPath(filename)));
      });
    });
  }

  /**
   *
   * @param {string} filename
   * @returns {Promise<StorageFile>}
   */
  async getFile(filename) {
    filename = this.getAbsPath(filename);
    return new Promise(async (resolve, reject) => {
      if (!(await this.exists(filename))) {
        return resolve(null);
      }
      return resolve(new StorageFile(filename));
    });
  }

  getAbsPath(filename) {
    return path.join(this.basePath, filename);
  }
  getRelativePath(filename) {
    return path.join(this.folder, filename);
  }
  async makeDirectory(directory) {
    directory = this.getAbsPath(directory);
    return new Promise(async (resolve, reject) => {
      if (!(await this.exists(directory))) {
        fs.mkdirSync(directory, {
          recursive: true,
        });
      }
      resolve();
    });
  }
  async exists(filename) {
    return new Promise((resolve, reject) => {
      fs.exists(filename, (exists) => resolve(exists));
    });
  }

  async storeUploadFile(file, destination, fileName = null) {
    await this.makeDirectory(destination);

    const randomName = crypto.randomBytes(15).toString("hex"),
      fileExt = path.extname(file.name);

    let randomFileName = randomName + fileExt;

    if (fileName) {
      randomFileName = fileName + fileExt;
    }

    const saveToLocation = path.join(destination, randomFileName),
      saveToLocationAbsPath = this.getAbsPath(saveToLocation);

    return new Promise((resolve, reject) => {
      file.mv(saveToLocationAbsPath, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(new StorageFile(saveToLocationAbsPath));
      });
    });
  }
}

module.exports = new FileSystemStorage();
