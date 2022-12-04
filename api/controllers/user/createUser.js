const { AppError, sendResponse, validateSchema } = require("../../../helpers/utils");
const User = require("../../../models/User");
const Joi = require("joi");

const requestSchema = Joi.object({
  name: Joi.string().case('lower').trim().required(),
  role: Joi.string().case('lower').trim().required(),
});
const createUser = async (req, res, next) => {
  try {
    const userInfo = validateSchema(requestSchema, req.body);

    const created = await User.create(userInfo);
    sendResponse(res, 200, true, { created }, null, "Create User Success");
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser };
