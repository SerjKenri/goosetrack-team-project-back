const Column = require('../../models/columnModel');

const getColumns = async (req, res) => {

  const { _id } = req.user;
  const columns = await Column.find({ owner: _id });

  res.status(200).json(columns);
};

const addColumn = async (req, res) => {

  const columns = await Column.find({ owner: req.user._id })
  const newColumn = {...req.body, position: columns.length, owner: req.user._id}
  const column = await Column.create(newColumn)

  res.status(201).json(column);
};

const deleteColumn = async (req, res) => {

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
  ])

  res.status(204).json();
};

const updateColumn = async (req, res) => {

  if (req.body.operationType === 'updateColumn') {

    const column = await Column.findByIdAndUpdate(req.params.id, req.body,  { new: true });

    res.status(200).json(column);}

  if (req.body.operationType === 'replaceColumn') {

    const { source, destination } = req.body;

    if (!destination.id) {

      const columns = await Column.find({ owner: req.user._id })
      await Column.updateMany({ position: { $gt: source.position }, owner: req.user._id }, { $inc: { position: -1 } })
      await Column.findByIdAndUpdate(source.id, { position: columns.length });
    }

    if (source.position > destination.position) {
      
      await Column.updateMany({ position: { $gte: destination.position, $lt: source.position }, owner: req.user._id }, { $inc: { position: +1 } })
      await Column.findByIdAndUpdate(source.id, { position: destination.position })
    }
    
    if (source.position < destination.position) {
      
      await Column.updateMany({ position: { $gt: source.position, $lte: destination.position }, owner: req.user._id }, { $inc: { position: -1 } })
      await Column.findByIdAndUpdate(source.id, { position: destination.position })
    }

    res.status(200).json({ message: 'Replaced' })
  }
};

module.exports = {
  getColumns,
  addColumn,
  deleteColumn,
  updateColumn,
};
