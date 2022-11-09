const mongoose = require("mongoose");
const { validateSchema, sendResponse } = require("../../../helpers/utils");
const Task = require("../../../models/Task");
const User = require("../../../models/User");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const requestSchema = Joi.object({
  name: Joi.string().case("lower").trim(),
  description: Joi.string(),
  status: Joi.string().case("lower").trim(),
  referenceTo: Joi.objectId(),
  createdAt: Joi.string(),
  updatedAt: Joi.string()
});
const getTasks = async (req, res, next) => {

  try {
    const filter = validateSchema(requestSchema, req.query)
    const taskInfo = await Task.find(filter)
    console.log(taskInfo)

    sendResponse(res, 200, true, {taskInfo}, null, "Find task success")

  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks };
