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

//joi.string().guid({ version : 'uuidv4' }))
 const MONGODB_UNIQUE_INDEX_ERROR_CODE = 11000

const requestSchema = Joi.object({
  name: Joi.string().case("lower").trim().required(),
  description: Joi.string(),
  status: Joi.string().case("lower").trim().required(),
  referenceTo: Joi.objectId().allow(null),
});
const createTask = async (req, res, next) => {
  try {
    const taskInfo = validateSchema(requestSchema, req.body);

    if (taskInfo.referenceTo) {
      const findId = await User.findById(taskInfo.referenceTo);
      if (!findId) throw new AppError(404, "Employee not found");
    }

    const created = await Task.create(taskInfo);
    sendResponse(res, 200, true, { created }, null, "Create Task Success");
  } catch (error) {
    if (error.code === MONGODB_UNIQUE_INDEX_ERROR_CODE) next(new AppError(409, "Task is exist")) 
    next(error);
  }
};

module.exports = { createTask, MONGODB_UNIQUE_INDEX_ERROR_CODE };
