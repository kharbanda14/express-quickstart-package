const StorageFile = require("../storage/drivers/filesystem/File");

module.exports = class Mail {
  constructor() {
    this.to = "";
    this.subject = "";
    this.viewFile = "";
    this.data = {};
    this.attachments = [];
  }

  text() {
    return "";
  }
  html() {
    return "";
  }

  /**
   * Add Attachment
   *
   * @param {string|StorageFile} filename
   * @param {*} path
   */
  addFileAttachment(filename, path) {
    if (filename instanceof StorageFile) {
      this.attachments.push({
        filename: filename.getFileName(),
        path: filename.filePath,
      });
      return;
    }
    this.attachments.push({
      filename,
      path,
    });
  }
};
