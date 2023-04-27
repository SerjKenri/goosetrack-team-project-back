const express = require('express');
const columnRouter = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const protectedRout = require('../../middlewares/authMiddleware');

// const validation = require('../../middlewares/joiValidation');

const {
  getColumns,
  addColumn,
  deleteColumn,
  updateColumn,
} = require('../../controllers/column/columnControllers');

columnRouter.use(protectedRout);

columnRouter.get('/', ctrlWrapper(getColumns));

columnRouter.post('/', ctrlWrapper(addColumn));

columnRouter.patch('/:id', ctrlWrapper(updateColumn));

columnRouter.delete('/:id', ctrlWrapper(deleteColumn));

module.exports = columnRouter;
