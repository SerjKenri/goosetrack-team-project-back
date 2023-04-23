const {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
} = require('../../utils/taskUtils');

const getTasks = async (req, res, next) => {
  //  const { _id } = req.user;
  const { year, month } = req.query;
  const tasks = await findTasks(year, month);

  res.status(200).json(tasks);
};

const addTask = async (req, res, next) => {
  // const { _id } = req.user;

  //      Приклад того, що приходить з фронту
  //  {
  //     "title": "taskName",
  //     "start": "13:00",
  //     "end": "14:00",
  //     "year": "2023",
  //     "month": "12"
  //   }

  const task = await createTask({ ...req.body });
  return res.status(201).json(task);
};

const deleteTask = async (req, res, next) => {
  await removeTask(req.params.id);
  res.json({ message: 'task deleted' });
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  // const { _id } = req.user;
  const body = req.body;

  const result = await updateTaskById(id, { ...body });
  res.json(result);
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};