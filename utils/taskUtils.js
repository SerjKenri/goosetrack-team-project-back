const Task = require('../models/taskModel');

const { NotFound } = require('http-errors');

const createTask = async body => {
  const newTask = await Task.create(body);
  return newTask;
};

const findTasks = async (userOwner, year, month) => {
  if (month.length === 1) {
    month = `0${month}`;
  }
  const tasks = await Task.find({
    userOwner,
    date: { $regex: `${year}-${month}` },
  })
  return tasks;
};

const removeTask = async _id => {
  const task = await Task.findByIdAndDelete(_id);

  if (!task) throw new NotFound('Task has not been found');

  return task;
};

const updateTaskById = async (_id, body) => {
  const task = await Task.findByIdAndUpdate(id, { ...body }, { new: true });
  return task;
};

module.exports = {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
};
