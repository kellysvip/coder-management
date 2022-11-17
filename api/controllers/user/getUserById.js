const User = require("../../../models/User");
const Joi = require("joi");
const { validateSchema, sendResponse, AppError } = require("../../../helpers/utils");
Joi.objectId = require('joi-objectid')(Joi)

const paramsSchema = Joi.object({
  userId: Joi.string().required(),
});


const getUserById = async (req, res, next) => {
  try {
    const { userId } = validateSchema(paramsSchema, req.params);
    
    if (userId) {
      const findId = await User.exists({_id: userId});
      if (!findId) throw new AppError(404, 'Employee not found');
    }

    const userInfo = await User.findById(userId);
    sendResponse(res, 200, true, { userInfo }, null, "Find User Success");
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
