const express = require('express');
const tasksRouter = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const protectedRout = require('../../middlewares/authMiddleware');

const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require('../../controllers/tasks/taskControllers');


tasksRouter.use(protectedRout);

tasksRouter.get('/', ctrlWrapper(getTasks));
tasksRouter.post('/', ctrlWrapper(addTask));
tasksRouter.patch('/:id', ctrlWrapper(updateTask));
tasksRouter.delete('/:id', ctrlWrapper(deleteTask));

module.exports = tasksRouter;
