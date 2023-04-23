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

const removeTask = async (_id, owner) => {
  // const task = await Task.findByIdAndRemove(id);
  const task = await Task.findOneAndDelete({ _id, owner });

  if (!task) throw new NotFound('Task has not been found');

  return task;
};

const updateTaskById = async (_id, owner, body) => {
  // const task = await Task.findByIdAndUpdate(id, { ...body }, { new: true });
  const task = await Task.findOneAndUpdate(
    { _id, owner },
    { ...body },
    { new: true }
  );
  if (!task) throw new NotFound('Task has not been found');
  return task;
};

module.exports = {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
};
