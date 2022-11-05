const express = require("express");
const { deleteTask } = require("../api/controllers/task/deleteTask");
const { getTaskById } = require("../api/controllers/task/getTaskById");
const { getTasks } = require("../api/controllers/task/getTasks");
const { updateTask } = require("../api/controllers/task/updateTask");
const router = express.Router();

/**
 * @route GET api/tasks
 * @description Get a list of tasks
 * @access private
 * @allowedQueries: (name, status, createdAt,…)
 */
router.get("/", getTasks);

/**
 * @route GET api/tasks/:id
 * @description Get task by id
 * @access public
 */
router.get("/:id", getTaskById);

/**
 * @route POST api/tasks
 * @description Create a new task
 * @access private, manager
 * @requiredBody: status, des
 */
router.post("/", createUser);

/**
 * @route UPDATE api/tasks/:id
 * @description Update a task
 * @access private, manager
 * @requiredBody: status, des,...
 */
router.post("/:id", updateTask);

/**
 * @route DELETE api/tasks/:id
 * @description Delete a task (soft)
 * @access private, manager
 */
router.post("/", deleteTask);

module.exports = router;
