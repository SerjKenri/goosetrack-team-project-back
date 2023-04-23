const { Schema, model } = require('mongoose');

const taskSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'add your task'],
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    status: {
      type: String,
      enum: ['toDo', 'inProgress', 'done'],
      default: 'toDo',
    },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);
module.exports = Task;
