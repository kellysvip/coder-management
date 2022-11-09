const mongoose = require("mongoose");
const { validateSchema, sendResponse } = require("../../../helpers/utils");
const Task = require("../../../models/Task");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const paramsSchema = Joi.object({
  taskId: Joi.objectId().required(),
});


const getTaskById = async (req, res, next) => {

  try {
    const {taskId} = validateSchema(paramsSchema, req.params)
    const taskInfo = await Task.findById(taskId)
    sendResponse(res, 200, true, {taskInfo}, null, "Find Task By Id Success")
  } catch (error) {
    next(error);
  }
};

module.exports = { getTaskById };
