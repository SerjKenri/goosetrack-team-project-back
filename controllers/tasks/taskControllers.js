const {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
  updateStatus,
} = require('../../utils/taskUtils');

const getTasks = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;
  const tasks = await findTasks(_id, year, month);

  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  const { _id } = req.user;
  const task = await createTask({ ...req.body, owner: _id });
  return res.status(201).json(task);
};

const deleteTask = async (req, res) => {
  const { _id } = req.user;
  await removeTask(req.params.id, _id);
  res.status(204).json();
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const body = req.body;

  const result = await updateTaskById(id, _id, body);

  res.status(200).json(result);
};

const updateCategoryTask = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await updateStatus(id, _id, req.body.category);

  res.status(200).json(result);
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  updateCategoryTask,
};
