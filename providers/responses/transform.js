module.exports = class TransformResponse {
  static toArray(data) {
    return {};
  }

  static map(data) {
    if (Array.isArray(data)) {
      return this.mapCollection(data);
    }
    return this.toArray(data);
  }

  static mapCollection(data) {
    return data.map((eachData) => this.toArray(eachData));
  }
};
