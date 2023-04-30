const Column = require('../../models/columnModel');
const Task = require('../../models/taskModel');

const getColumns = async (req, res) => {
  const { _id } = req.user;

  // const tasks = await Task.find({
  //   owner: _id,
  // });
  // req.body.tasks = tasks;
  const columns = await Column.find({ owner: _id });

  res.status(200).json(columns);
};

const addColumn = async (req, res) => {
  const { _id } = req.user;

  const columns = await Column.find({ owner: _id });

  req.body.owner = _id;
  req.body.position = columns.length + 1;

  const column = await Column.create(req.body);
  res.status(201).json(column);
};

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  // const { _id } = req.user;

  const { _id, position, owner } = await Column.findById(req.params.id);
  await Column.bulkWrite([
    {
      deleteMany: {
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
  const { id } = req.params;
  const { _id } = req.user;
  const body = req.body;
  console.log(body);
  const column = await Column.findOneAndUpdate(
    { _id: id, owner: _id },
    { ...body },
    {
      new: true,
    }
  );

  res.status(200).json(column);
};

module.exports = {
  getColumns,
  addColumn,
  deleteColumn,
  updateColumn,
};
