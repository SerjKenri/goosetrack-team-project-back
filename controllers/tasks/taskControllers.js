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
  const newtask = { ...req.body, position: tasks.length, userOwner: _id };

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
        console.log(req.body)


  if (req.body.operationType === 'updateTask') {
    console.log('operationType: updateTask')
  
    const result = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(result)
  }

  if (req.body.operationType === 'replaceTask') {

    console.log('operationType: replaceTask')

    const { source, destination } = req.body;

    const { columnId } = await Task.findById(source.id)

    if (!destination.id) {

      console.log('operationType: replaceTask => to the end')


      const tasks = await Task.find({ columnId: columnId })
      const tasksIncolumn = await Task.updateMany({ position: { $gt: source.position }, columnId: columnId }, { $inc: { position: -1 } })
      console.log('tasksIncolumn: ', tasksIncolumn)

      const replacedTask = await Task.findByIdAndUpdate(source.id, { position: tasks.length });
      console.log('replacedTask: ', replacedTask)

    }

    if (source.position > destination.position) {

      console.log('operationType: replaceTask => to the top')

      
      const tasksIncolumn = await Task.updateMany({ position: { $gte: destination.position, $lt: source.position }, columnId: columnId }, { $inc: { position: +1 } })
      console.log('tasksIncolumn: ', tasksIncolumn)

      const replacedTask = await Task.findByIdAndUpdate(source.id, { position: destination.position })
      console.log('replacedTask: ', replacedTask)

    }
    
    if (source.position < destination.position) {

      console.log('operationType: replaceTask => to the bottom')

      
      const tasksIncolumn = await Task.updateMany({ position: { $gt: source.position, $lte: destination.position }, columnId: columnId }, { $inc: { position: -1 } })
      console.log('tasksIncolumn: ', tasksIncolumn)

      const replacedTask = await Task.findByIdAndUpdate(source.id, { position: destination.position })
      console.log('replacedTask: ', replacedTask)

    }
    

    res.status(200).json({ message: 'Replaced' })
  }

  if (req.body.operationType === 'replaceColumnsTask') {

    console.log('operationType: replaceColumnsTask')

    const { source, destination } = req.body;

    if (!destination.id) {

      console.log('operationType: replaceColumnsTask ==> to the end')

        
      const tasks = await Task.find({ columnId: destination.columnId })

      console.log(tasks)

      // const tasksIncolumn = await Task.updateMany({ position: { $gte: destination.columnId }, columnId: destination.columnId }, { $inc: { position: +1 } })
      // console.log('tasksIncolumn: ', tasksIncolumn)

      const replacedTask = await Task.findByIdAndUpdate(source.id, { position: tasks.length, columnId: destination.columnId }, {new: true})
      console.log('replacedTask: ', replacedTask)

      
      res.status(200).json({ message: 'Replaced' });


    } else {

      const tasksIncolumn = await Task.updateMany({ position: { $gte: destination.position }, columnId: destination.columnId }, { $inc: { position: +1 } })
      console.log('tasksIncolumn: ', tasksIncolumn)

      const replacedTask = await Task.findByIdAndUpdate(source.id, { position: destination.position, columnId: destination.columnId })
      console.log('replacedTask: ', replacedTask)

      // await Task.bulkWrite([
      //   { deleteOne: { filter: { _id: source.id } } },
      //   {
      //       updateMany: {
      //           filter: { columnId: source.columnId, position: { $gt: source.position } },
      //           update: { $inc: { idx: -1 } },
      //       },
      //   },
      //   ])
      // }

      // const tasks = await Task.find({ columnId: newColumnId });
      // const updTask = { columnId: newColumnId, position: tasks.length + 1 };
      // await Task.findByIdAndUpdate(id, updTask);

      res.status(200).json({ message: 'Replaced' });
    }
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
}
