const { Schema, model } = require('mongoose');

// const { PRIORITY, CATEGORY } = require('../constants/taskConstants');

const columnSchema = Schema(
  {
    columnName: {
      type: String,
      required: [true, 'add status'],
    },
    position: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false }
);

const Column = model('column', columnSchema);
module.exports = Column;
