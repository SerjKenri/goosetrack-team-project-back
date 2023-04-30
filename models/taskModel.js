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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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
    // columnId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'column',
    // },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);
module.exports = Task;
