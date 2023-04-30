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
  replaceColumn
} = require('../../controllers/column/columnControllers');

columnRouter.use(protectedRout);

columnRouter.get('/', ctrlWrapper(getColumns));

columnRouter.post('/', ctrlWrapper(addColumn));

columnRouter.delete('/:id', ctrlWrapper(deleteColumn));

columnRouter.patch('/:id', ctrlWrapper(updateColumn));

columnRouter.patch('/:id', ctrlWrapper(replaceColumn));


module.exports = columnRouter;
