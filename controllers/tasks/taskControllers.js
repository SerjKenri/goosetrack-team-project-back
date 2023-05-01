const Task = require('../../models/taskModel');
const {
  findTasks,
  removeTask,
  createTask,
  updateTaskById,
} = require('../../utils/taskUtils');

const getTasks = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;
  const tasks = await findTasks(_id, year, month);

  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  const { _id } = req.user;

  const tasks = await Task.find({ columnId: req.body.columnId });
  const newtask = { ...req.body, position: tasks.length + 1, userOwner: _id };

  const task = await Task.create(newtask);

  return res.status(201).json(task);
};

const deleteTask = async (req, res) => {
  const { _id, position, columnId } = await Task.findById(req.params.id);

  await Task.bulkWrite([
    {
      deleteOne: {
        filter: { _id },
      },
    },
    {
      updateMany: {
        filter: { position: { $gt: position }, columnId },
        update: { $inc: { position: -1 } },
      },
    },
  ]);

  res.status(204).json();
};

const updateTask = async (req, res) => {

  if (req.body.operationType === 'updateTask') {
  
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(result)
  }

  if (req.body.operationType === 'replaceTask') {

    const { source, destination } = req.body;

    await Task.findByIdAndUpdate(source.id, { position: destination.position });
    await Task.findByIdAndUpdate(destination.id, { position: source.position });

    res.status(200).json({ message: 'Replaced' })
  }

  if (req.body.operationType === 'replaceColumnsTask') {

    const { id, newColumnId } = req.body;
    const tasks = await Task.find({ columnId: newColumnId });
    const updTask = { columnId: newColumnId, position: tasks.length + 1 };
    await Task.findByIdAndUpdate(id, updTask);

    res.status(200).json({ message: 'Replaced' });
  }
};

// const updateTask = async (req, res) => {
  
//   const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   res.status(200).json(result);
// };

// const replaceTask = async (req, res) => {
//   const { topTask, bottomTask } = req.body;

//   await Task.findByIdAndUpdate(topTask.id, { position: bottomTask.position });
//   await Task.findByIdAndUpdate(bottomTask.id, { position: topTask.position });

//   res.status(200).json({ message: 'Replaced' });
// };

// const replaceColumnsTask = async (req, res) => {
//   const { id, newColumnId } = req.body;

//   const tasks = await Task.find({ columnId: newColumnId });

//   const updTask = { columnId: newColumnId, position: tasks.length + 1 };

//   await Task.findByIdAndUpdate(id, updTask);

//   res.status(200).json({ message: 'Replaced' });
// };


module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  // replaceTask,
  // replaceColumnsTask,
};
