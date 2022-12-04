const express = require('express');
const { createUser } = require('../api/controllers/user/createUser');
const { getUserById } = require('../api/controllers/user/getUserById');
const { getUsers } = require('../api/controllers/user/getUsers');
const router = express.Router();

/**
 * @route GET api/users
 * @description Get a list of users
 * @access private
 * @allowedQueries: name
 */
router.get('/', getUsers)

/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
 router.get('/:userId', getUserById)

 /**
 * @route POST api/users
 * @description Create a new user
 * @access private, manager
 * @requiredBody: name
 */
router.post('/', createUser)





module.exports = router;