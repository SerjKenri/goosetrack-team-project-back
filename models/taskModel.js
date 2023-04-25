const { Schema, model } = require('mongoose');

const { PRIORITY, STATUS } = require('../constants/taskConstants');

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
    day: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITY), // ["low","medium","high"]
      default: PRIORITY.LOW,
    },
    status: {
      type: String,
      enum: Object.values(STATUS), // ["toDo","inProgress","done"]
      default: STATUS.TODO,
    },
  },
  { versionKey: false }
);

const Task = model('task', taskSchema);
module.exports = Task;
