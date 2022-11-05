var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});

// //catch when when request match no route
// app.use((req,res,next)=>{
//   const exception = new Error(`Path not found`);
//   exception.statusCode = 404;
//   next(exception)
// })

// //customize express error handling middleware
// app.use((err,req,res,next)=>{
//   res.status(err.statusCode).send(err.message)
// })

// CAR
const userAPI = require('./user.api');
router.use('/users', userAPI);

const taskAPI = require('./task.api');
router.use('/tasks', taskAPI);

module.exports = router;
