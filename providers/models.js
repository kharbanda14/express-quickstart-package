const fs = require("fs");
const path = require("path");
const { debug } = require("./logger");

const modelsDirectory = path.join(process.cwd(), "app/models");

const modelsList = fs.readdirSync(modelsDirectory);

const availableModels = {};

modelsList.forEach((model) => {
  const modelPath = path.join(modelsDirectory, model);

  if (fs.statSync(modelPath).isDirectory()) {
    return;
  }

  const modelObject = require(modelPath);
  availableModels[modelObject.modelName] = modelObject;
  debug(`${modelObject.modelName} Loaded`);
});

module.exports = availableModels;

module.exports.registerModel = (model) => {
  if (availableModels[model.modelName]) {
    throw new Error(
      `Mode with ${model.modelName} has been already registered.`
    );
  }
  availableModels[model.modelName] = model;
};
