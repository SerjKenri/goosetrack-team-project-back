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
} = require('../../controllers/tasks/taskControllers');

tasksRouter.use(protectedRout);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks per month.
 *     tags:
 *       - Tasks
 *     description: Get tasks per month.
 *     parameters:
 *       - in: query
 *         name: year
 *         type: string
 *         description: The year of task implementation.
 *         example: "2023"
 *         required: true
 *       - in: query
 *         name: month
 *         type: string
 *         description: The month of task implementation.
 *         example: "05"
 *         required: true
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: string
 *                         description: Task ID.
 *                         example: "644629afdb51c35fa8f0c9af"
 *                       title:
 *                         type: string
 *                         description: Task title.
 *                         example: "to complete team project"
 *                       start:
 *                         type: string
 *                         description: Task start time.
 *                         example: "11:00"
 *                       end:
 *                         type: string
 *                         description: Task end time.
 *                         example: "14:00"
 *                       year:
 *                         type: string
 *                         description: The year of task implementation.
 *                         example: "2023"
 *                       month:
 *                         type: string
 *                         description: The month of task implementation.
 *                         example: "05"
 *                       day:
 *                         type: string
 *                         description: The day of task implementation.
 *                         example: "03"
 *                       priority:
 *                         type: string
 *                         description: Task priority.
 *                         example: 'high'
 *                       status:
 *                         type: string
 *                         description: Task status.
 *                         example: 'inProgress'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Bearer authorization failed
 *       404:
 *         description: Tasks not found
 */

tasksRouter.get('/', ctrlWrapper(getTasks));

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Post a task.
 *     tags:
 *       - Tasks
 *     description: Post a task.
 *     requestBody:
 *       description: A JSON object containing task information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                     title:
 *                       type: string
 *                       description: Task title.
 *                       example: "to complete team project"
 *                     start:
 *                       type: string
 *                       description: Task start time.
 *                       example: "11:00"
 *                     end:
 *                       type: string
 *                       description: Task end time.
 *                       example: "14:00"
 *                     year:
 *                       type: string
 *                       description: The year of task implementation.
 *                       example: "2023"
 *                     month:
 *                       type: string
 *                       description: The month of task implementation.
 *                       example: "05"
 *                     day:
 *                       type: string
 *                       description: The day of task implementation.
 *                       example: "03"
 *                     priority:
 *                       type: string
 *                       description: Task priority.
 *                       example: 'high'
 *                     status:
 *                       type: string
 *                       description: Task status.
 *                       example: 'inProgress'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       id:
 *                         type: string
 *                         description: Task ID.
 *                         example: "644629afdb51c35fa8f0c9af"
 *                       title:
 *                         type: string
 *                         description: Task title.
 *                         example: "to complete team project"
 *                       start:
 *                         type: string
 *                         description: Task start time.
 *                         example: "11:00"
 *                       end:
 *                         type: string
 *                         description: Task end time.
 *                         example: "14:00"
 *                       year:
 *                         type: string
 *                         description: The year of task implementation.
 *                         example: "2023"
 *                       month:
 *                         type: string
 *                         description: The month of task implementation.
 *                         example: "05"
 *                       day:
 *                         type: string
 *                         description: The day of task implementation.
 *                         example: "03"
 *                       priority:
 *                         type: string
 *                         description: Task priority.
 *                         example: 'high'
 *                       status:
 *                         type: string
 *                         description: Task status.
 *                         example: 'inProgress'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Bearer authorization failed
 *
 */

tasksRouter.post('/', validation(taskSchema), ctrlWrapper(addTask));

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   patch:
 *     summary: Update the task.
 *     tags:
 *       - Tasks
 *     description: Update the task.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         type: string
 *         description: Task Id.
 *         example: "6444e788e0ba520cae441053"
 *         required: true
 *     requestBody:
 *       description: A JSON object containing task update information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                     title:
 *                       type: string
 *                       description: Task title.
 *                       example: "to complete team project"
 *                     start:
 *                       type: string
 *                       description: Task start time.
 *                       example: "11:00"
 *                     end:
 *                       type: string
 *                       description: Task end time.
 *                       example: "14:00"
 *                     year:
 *                       type: string
 *                       description: The year of task implementation.
 *                       example: "2023"
 *                     month:
 *                       type: string
 *                       description: The month of task implementation.
 *                       example: "05"
 *                     day:
 *                       type: string
 *                       description: The day of task implementation.
 *                       example: "03"
 *                     priority:
 *                       type: string
 *                       description: Task priority.
 *                       example: 'high'
 *                     status:
 *                       type: string
 *                       description: Task status.
 *                       example: 'inProgress'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: string
 *                         description: Task ID.
 *                         example: "644629afdb51c35fa8f0c9af"
 *                       title:
 *                         type: string
 *                         description: Task title.
 *                         example: "to complete team project"
 *                       start:
 *                         type: string
 *                         description: Task start time.
 *                         example: "11:00"
 *                       end:
 *                         type: string
 *                         description: Task end time.
 *                         example: "14:00"
 *                       year:
 *                         type: string
 *                         description: The year of task implementation.
 *                         example: "2023"
 *                       month:
 *                         type: string
 *                         description: The month of task implementation.
 *                         example: "05"
 *                       day:
 *                         type: string
 *                         description: The day of task implementation.
 *                         example: "03"
 *                       priority:
 *                         type: string
 *                         description: Task priority.
 *                         example: 'high'
 *                       status:
 *                         type: string
 *                         description: Task status.
 *                         example: 'inProgress'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Bearer authorization failed
 *       404:
 *         description: Task not found
 *
 */

tasksRouter.patch('/:id', ctrlWrapper(updateTask));

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Delete the task.
 *     tags:
 *       - Tasks
 *     description: Delete the task.
 *     parameters:
 *       - in: path
 *         name: taskId
 *         type: string
 *         description: Task Id.
 *         example: "6444e788e0ba520cae441053"
 *         required: true
 *     responses:
 *       204:
 *         description: The Task has been deleted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Bearer authorization failed
 *       404:
 *         description: Task not found
 *
 */

tasksRouter.delete('/:id', ctrlWrapper(deleteTask));

module.exports = tasksRouter;
