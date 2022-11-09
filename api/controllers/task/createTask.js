const mongoose = require("mongoose");
const Task = require("../../../models/Task");
const Joi = require("joi");
const {
  validateSchema,
  sendResponse,
  AppError,
} = require("../../../helpers/utils");
const User = require("../../../models/User");
Joi.objectId = require("joi-objectid")(Joi);

const requestSchema = Joi.object({
  name: Joi.string().case("lower").trim().required(),
  description: Joi.string(),
  status: Joi.string().case("lower").trim().required(),
});
const createTask = async (req, res, next) => {
  try {
    const taskInfo = validateSchema(requestSchema, req.body);

    if (taskInfo.referenceTo) {
      const findId = await User.findById(taskInfo.referenceTo);
      if (!findId) throw new AppError(404, "Employee not found");
    }

    const { name } = taskInfo;
    console.log((await Task.find({ name })).length);
    if ((await Task.find({ name })).length)
      throw new AppError(400, "Task is exist");

    const created = await Task.create(taskInfo);
    sendResponse(res, 200, true, { created }, null, "Create Task Success");
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask };
