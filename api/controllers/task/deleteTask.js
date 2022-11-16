const Joi = require("joi");
const mongoose = require("mongoose");
const { sendResponse, validateSchema } = require("../../../helpers/utils");
const Task = require("../../../models/Task");
Joi.objectId = require('joi-objectid')(Joi)

const paramsSchema = Joi.object({
  taskId: Joi.objectId().required(),
});

const deleteTask = async (req, res, next) => {

  try {
    const { taskId } = validateSchema(paramsSchema, req.params);
    const deleted = await Task.findByIdAndUpdate(taskId, {isDeleted: true}, {new: true})
    sendResponse(res, 200, true, {deleted}, null, "Delete Success")
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteTask };
