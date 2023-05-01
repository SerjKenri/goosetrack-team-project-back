const express = require('express');
const tasksRouter = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const protectedRout = require('../../middlewares/authMiddleware');

const taskSchema = require('../../service/schemas/taskJoiSchema');
const validation = require('../../middlewares/joiValidation');

const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  // replaceTask,
  // replaceColumnsTask,
} = require('../../controllers/tasks/taskControllers');

tasksRouter.use(protectedRout);

tasksRouter.get('/', ctrlWrapper(getTasks));

tasksRouter.post('/', validation(taskSchema), ctrlWrapper(addTask));

tasksRouter.patch('/:id', validation(taskSchema), ctrlWrapper(updateTask));

// tasksRouter.patch('/:id', validation(taskSchema), ctrlWrapper(replaceTask));

// tasksRouter.patch('/:id', validation(taskSchema), ctrlWrapper(replaceColumnsTask));


tasksRouter.delete('/:id', ctrlWrapper(deleteTask));

module.exports = tasksRouter;
