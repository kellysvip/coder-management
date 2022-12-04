const express = require("express");
const { createTask } = require("../api/controllers/task/createTask");
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
 * @route GET api/tasks/:taskId
 * @description Get task by id
 * @access public
 */
router.get("/:taskId", getTaskById);

/**
 * @route POST api/tasks
 * @description Create a new task
 * @access private, manager
 * @requiredBody: status, des
 */
router.post("/", createTask);

/**
 * @route UPDATE api/tasks//:taskId
 * @description Update a task
 * @access private, manager
 * @requiredBody: status, des,...
 */
router.put("/:taskId", updateTask);

/**
 * @route DELETE api/tasks//:taskId
 * @description Delete a task (soft)
 * @access private, manager
 */
router.delete("/:taskId", deleteTask);

module.exports = router;
