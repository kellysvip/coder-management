const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "none",
      require: false,
    },
    status: {
      type: String,
      require: true,
      enum: ["pending", "working", "review", "done", "archive"],
    },
    isDeleted: { type: Boolean, default: false, required: true },
    referenceTo: { type: mongoose.SchemaTypes.ObjectId, default: null, ref: "User" },
    createdAt: { type: String, require: true },
    updatedAt: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
