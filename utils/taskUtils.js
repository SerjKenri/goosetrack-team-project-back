const Task = require('../models/taskModel');

const createTask = async body => {
  const newTask = await Task.create(body);
  return newTask;
};

const findTasks = async (year, month) => {
  const tasks = await Task.find({ year, month });
  if (tasks.length <= 0) {
    throw new Error('not find');
  }
  return tasks;
};

const removeTask = async id => {
  const task = await Task.findByIdAndRemove(id);
  if (!task) throw new Error(`Not found`);

  return task;
};

const updateTaskById = async (id, body) => {
  const task = await Task.findByIdAndUpdate(id, { ...body }, { new: true });

  if (!task) throw new Error(`Not found `);
  return task;
};

module.exports = {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
};
