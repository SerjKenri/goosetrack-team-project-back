const Column = require('../../models/columnModel');
const Task = require('../../models/taskModel');
const {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
} = require('../../utils/taskUtils');

const getTasks = async (req, res) => {
  const { _id } = req.body;
  const { year, month } = req.query;
  const tasks = await findTasks(_id, year, month);

  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  
  const task = await Task.create(req.body);

  return res.status(201).json(task);
};

const deleteTask = async (req, res) => {
  // const { _id } = req.user;

  const { _id, position, owner } = await Task.findById(req.params.id);
  
  await Task.bulkWrite([
    {
      deleteOne: {
        filter: { _id },
      },
    },
    {
      updateMany: {
        filter: { position: { $gt: position }, owner },
        update: { $inc: { position: -1 } },
      },
    },
  ]);

  res.status(204).json();
};

const updateTask = async (req, res) => {

  const result = await Task.findByIdAndUpdate(req.params.id, req.body,  { new: true });

  res.status(200).json(result);
};

const replaceTask = async (req, res) => {

    const {type, _id, owner, position} = req.body

    let positionToReplace

    if (type === 'up') positionToReplace = position - 1

    if (type === 'down') positionToReplace = position + 1

    
    await Task.findOneAndUpdate({ owner, position: positionToReplace }, { position })
    await Task.findByIdAndUpdate(_id, { position: positionToReplace })
   
    res.status(200).json({message: "Replaced"})
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  replaceTask
};
