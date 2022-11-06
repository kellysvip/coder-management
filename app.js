require("dotenv").config();
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Connect to MONGODB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log(`Connected to Database!, ${process.env.MONGO_URI}`);
});

var indexRouter = require("./routes/index");

app.use("/", indexRouter);

module.exports = app;
