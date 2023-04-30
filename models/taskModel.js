const { Schema, model } = require('mongoose');

const { PRIORITY, CATEGORY } = require('../constants/taskConstants');

const taskSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'add your task'],
    },
    start: {
      type: String,
      required: [true, 'add start time'],
    },
    end: {
      type: String,
      required: [true, 'add end time'],
    },
    date: {
      type: String,
      required: [true, 'set date'],
    },
    position: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'column',
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITY), // ["low","medium","high"]
      default: PRIORITY.LOW,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(CATEGORY), // ["toDo","inProgress","done"]
      default: CATEGORY.TODO,
      required: true,
    },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);
module.exports = Task;
