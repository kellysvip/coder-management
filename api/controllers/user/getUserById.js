const User = require("../../../models/User");
const Joi = require("joi");
const { validateSchema, sendResponse } = require("../../../helpers/utils");
Joi.objectId = require('joi-objectid')(Joi)

const paramsSchema = Joi.object({
  userId: Joi.string().required(),
});


const getUserById = async (req, res, next) => {
  try {
    const { userId } = validateSchema(paramsSchema, req.params);

    const userInfo = await User.findById(userId);
    sendResponse(res, 200, true, { userInfo }, null, "Find User Success");
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserById };
