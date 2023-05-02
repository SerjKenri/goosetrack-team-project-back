const Column = require('../../models/columnModel');
// const Task = require('../../models/taskModel');

const getColumns = async (req, res) => {
  const { _id } = req.user;

  const columns = await Column.find({ owner: _id });

  res.status(200).json(columns);
};

const addColumn = async (req, res) => {
  // const { _id, name } = req.body;


  const columns = await Column.find({ owner: req.user._id })
  const newColumn = {...req.body, position: columns.length + 1, owner: req.user._id}
  // req.body.newColumn = newColumn

  // const columns = await Column.create({ owner: _id });

  // req.body.owner = _id;
  // req.body.position = columns.length + 1;
  const column = await Column.create(newColumn);
  res.status(201).json(column);
};

const deleteColumn = async (req, res) => {
  // const { id } = req.params;
  // const { _id } = req.user;

  const { _id, position, owner } = await Column.findById(req.params.id);
  await Column.bulkWrite([
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

  // const columns = await Column.find({ owner: _id });
  // positions = columns.map(column => column.position);
  // console.log(positions);

  // const column = await Column.findOne({ _id: id, owner: _id });
  // console.log(column.position);

  // await Column.findOneAndDelete({ _id: id, owner: _id });

  res.status(204).json();
};

const updateColumn = async (req, res) => {

  if (req.body.operationType === 'updateColumn') {

    const column = await Column.findByIdAndUpdate(req.params.id, req.body,  { new: true });

    res.status(200).json(column);}

  if (req.body.operationType === 'replaceColumn') {

    const { source, destination } = req.body;

    if (!destination.position) {

      const columns = await Column.find({ owner: req.user._id })
      await Column.updateMany({ position: { $gt: source.position }, owner: req.user._id }, { $inc: { position: -1 } })
      await Column.findByIdAndUpdate(source.id, { position: columns.length + 1 });
    }

    if (source.position > destination.position) {
      
      await Column.updateMany({ position: { $gte: destination.position, $lt: source.position }, owner: req.user._id }, { $inc: { position: +1 } })
      await Column.findByIdAndUpdate(source.id, { position: destination.position })
    }
    
    if (source.position < destination.position) {
      
      await Column.updateMany({ position: { $gt: source.position, $lte: destination.position }, owner: req.user._id }, { $inc: { position: -1 } })
      await Column.findByIdAndUpdate(source.id, { position: destination.position })
    }

    // await Column.findByIdAndUpdate(source.id, { position: destination.position });
    // await Column.findByIdAndUpdate(destination.id, { position: source.position });

    res.status(200).json({ message: 'Replaced' })
  }
};

// const replaceColumn = async (req, res) => {

//     const {type, _id, owner, position} = req.body

//     let positionToReplace

//     if (type === 'up') positionToReplace = position - 1

//     if (type === 'down') positionToReplace = position + 1

    
//     await Column.findOneAndUpdate({ owner, position: positionToReplace }, { position })
//     await Column.findByIdAndUpdate(_id, { position: positionToReplace })
   
//     res.status(200).json({message: "Replaced"})
// };

module.exports = {
  getColumns,
  addColumn,
  deleteColumn,
  updateColumn,
  // replaceColumn
};
