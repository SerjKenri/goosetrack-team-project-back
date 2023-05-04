const Task = require('../../models/taskModel');
const {
  findTasks
} = require('../../utils/taskUtils');

const getTasks = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;
  const tasks = await findTasks(_id, year, month);

  res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  const { _id } = req.user;

  const tasks = await Task.find({ columnId: req.body.columnId, date: req.body.date });
  const newtask = { ...req.body, position: tasks.length, userOwner: _id };

  const task = await Task.create(newtask);

  return res.status(201).json(task);
};

const deleteTask = async (req, res) => {
  const { _id, position, columnId, date } = await Task.findById(req.params.id);

  await Task.bulkWrite([
    {
      deleteOne: {
        filter: { _id },
      },
    },
    {
      updateMany: {
        filter: { position: { $gt: position }, columnId, date },
        update: { $inc: { position: -1 } },
      },
    },
  ]);

  res.status(204).json();
};

const updateTask = async (req, res) => {


  if (req.body.operationType === 'updateTask') {
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(result)
  }

  if (req.body.operationType === 'replaceTask') {

    const { source, destination } = req.body;
    const { columnId, date } = await Task.findById(source.id)

    if (!destination.id) {
      const tasks = await Task.find({ columnId: columnId, date: date })
      await Task.updateMany({ position: { $gt: source.position }, columnId: columnId, date: date }, { $inc: { position: -1 } })
      await Task.findByIdAndUpdate(source.id, { position: tasks.length });
    }

    if (source.position > destination.position) {
      await Task.updateMany({ position: { $gte: destination.position, $lt: source.position }, columnId: columnId, date: date }, { $inc: { position: +1 } })
      await Task.findByIdAndUpdate(source.id, { position: destination.position })
    }
    
    if (source.position < destination.position) {
      await Task.updateMany({ position: { $gt: source.position, $lte: destination.position }, columnId: columnId, date: date }, { $inc: { position: -1 } })
      await Task.findByIdAndUpdate(source.id, { position: destination.position })
    }

    res.status(200).json({ message: 'Replaced' })
  }

  if (req.body.operationType === 'replaceColumnsTask') {

    const { source, destination } = req.body
    const { date } = await Task.findById(source.id)

    if (!destination.id) {
      const tasks = await Task.find({ columnId: destination.columnId, date: date })
      await Task.findByIdAndUpdate(source.id, { position: tasks.length, columnId: destination.columnId }, {new: true})      
      await Task.updateMany({ position: { $gte: source.position }, columnId: source.columnId, date: date }, { $inc: { position: -1 } })
    } else {
      await Task.updateMany({ position: { $gte: destination.position }, columnId: destination.columnId, date: date }, { $inc: { position: +1 } })
      await Task.findByIdAndUpdate(source.id, { position: destination.position, columnId: destination.columnId })
      await Task.updateMany({ position: { $gte: source.position }, columnId: source.columnId, date: date }, { $inc: { position: -1 } })
    }

    res.status(200).json({ message: 'Replaced' })

  }
};


module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
}
