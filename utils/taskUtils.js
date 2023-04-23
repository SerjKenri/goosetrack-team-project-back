const Task = require('../models/taskModel');
const { NotFound } = require('http-errors');

const createTask = async body => {
  const newTask = await Task.create(body);
  return newTask;
};

const findTasks = async (owner, year, month) => {
  const tasks = await Task.find({ owner, year, month });
  if (tasks.length <= 0) {
    throw new NotFound('Tasks have not been found');
  }
  return tasks;
};

const removeTask = async id => {
  const task = await Task.findByIdAndRemove(id);
  if (!task) throw new NotFound('Task has not been found');

  return task;
};

const updateTaskById = async (id, body) => {
  try {
    const task = await Task.findByIdAndUpdate(id, { ...body }, { new: true });
    return task;
  } catch (error) {
    throw new NotFound('Task has not been found');
  }
};

module.exports = {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
};
