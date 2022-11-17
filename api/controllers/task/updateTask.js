const { validateSchema, sendResponse, AppError } = require('../../../helpers/utils');
const User = require('../../../models/User');
const Joi = require('joi');
const Task = require('../../../models/Task');
Joi.objectId = require('joi-objectid')(Joi);

const paramsSchema = Joi.object({
  taskId: Joi.objectId().required(),
});
const requestSchema = Joi.object({
  name: Joi.string().case('lower').trim(),
  description: Joi.string(),
  status: Joi.string().case('lower').trim(),
  referenceTo: Joi.string().allow(null),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = validateSchema(paramsSchema, req.params);
    const updateInfo = validateSchema(requestSchema, req.body);

    if (taskId) {
      const findTaskId = await User.exists({_id: taskId});
      if (!findTaskId) throw new AppError(404, 'Task not found');
    }

    if (updateInfo.referenceTo) {
      const findId = await User.exists({_id: updateInfo.referenceTo});
      if (!findId) throw new AppError(404, 'Employee not found');
    }
    if (updateInfo.status) {
      const findStatus = await Task.findById(taskId);
      if (findStatus.status === 'done' && updateInfo.status !== 'archive')
        throw new AppError(400, 'Status is not accept');
    }

    const updated = await Task.findByIdAndUpdate(taskId, updateInfo, {new: true});
    sendResponse(res, 200, true, { updated }, null, 'Update Success');
  } catch (error) {
    next(error);
  }
};

module.exports = { updateTask };
