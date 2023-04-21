const express = require('express');
const tasksRouter = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const ctrl = require('../../controllers/tasks');

tasksRouter.get('/', ctrlWrapper(ctrl.getTasks));
tasksRouter.post('/', ctrlWrapper(ctrl.addTask));
tasksRouter.patch('/:id', ctrlWrapper(ctrl.updateTask));
tasksRouter.delete('/:id', ctrlWrapper(ctrl.deleteTask));

module.exports = tasksRouter;
