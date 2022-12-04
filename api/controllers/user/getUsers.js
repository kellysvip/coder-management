const mongoose = require('mongoose');
const User = require('../../../models/User');
const Joi = require('joi');
const { sendResponse, validateSchema } = require('../../../helpers/utils');
const createHttpError = require('http-errors');

const requestSchema = Joi.object({
  name: Joi.string().case('lower').trim(),
  role: Joi.string().case('lower').trim(),
});
const getUsers = async (req, res, next) => {
  try {
    const filter = validateSchema(requestSchema, req.query);

    let userInfo;
    if (!filter.name || !filter.role) userInfo = await User.find();
    else
      userInfo = await User.find({
        ...filter,
        name: { $regex: '.*' + filter.name + '.*' },
      });

    sendResponse(res, 200, true, { userInfo }, null, 'Find User Success');
  } catch (error) {
    next(createHttpError(401, error));
  }
};

module.exports = { getUsers };
