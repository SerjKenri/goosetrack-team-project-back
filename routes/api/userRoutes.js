const express = require('express');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const {
  currentUser,
  logoutUser,
  changeUser,
} = require('../../controllers/user/userControler');
const {
  patchUpdateUserValidation,
} = require('../../middlewares/userValidation');
const protectedRout = require('../../middlewares/authMiddleware');
const userRouter = express.Router();

// Protected routes

userRouter.use('/', protectedRout);

/**
 * @swagger
 * /api/user/current:
 *   get:
 *     summary: Retrieve user information.
 *     description: Retrieve detailed user information.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 64450b66b62acbe0e8144e25
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: wasem43302@gam1fy.com
 *                       avatarURL:
 *                         type: string
 *                         description: Link to the user's avatar.
 *                         example: https://console.cloudinary.com/console/c-fe36772524833d53cebdde791b3244/media_library/search?q=
 *                       birthDay:
 *                         type: date
 *                         description: The user's birthday.
 *                         example: 01.01.2000
 *                       phone:
 *                         type: string
 *                         description: The user's phone.
 *                         example: +380971234567
 *                       messenger:
 *                         type: string
 *                         description: The user's messenger.
 *                         example: 1234567
 */
userRouter.get('/current', ctrlWrapper(currentUser));
userRouter.post('/logout', ctrlWrapper(logoutUser));

/**
 * @swagger
 * /api/user/info:
 *   patch:
 *     summary: Update user information.
 *     description: Update or add user information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: wasem43302@gam1fy.com
 *               avatarURL:
 *                 type: string
 *                 description: Link to the user's avatar.
 *                 example: https://console.cloudinary.com/console/c-fe36772524833d53cebdde791b3244/media_library/search?q=
 *               birthDay:
 *                 type: date
 *                 description: The user's birthday.
 *                 example: 01.01.2000
 *               phone:
 *                 type: string
 *                 description: The user's phone.
 *                 example: +380971234567
 *               messenger:
 *                 type: string
 *                 description: The user's messenger.
 *                 example: 1234567
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 64450b66b62acbe0e8144e25
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: wasem43302@gam1fy.com
 *                       avatarURL:
 *                         type: string
 *                         description: Link to the user's avatar.
 *                         example: https://console.cloudinary.com/console/c-fe36772524833d53cebdde791b3244/media_library/search?q=
 *                       birthDay:
 *                         type: date
 *                         description: The user's birthday.
 *                         example: 01.01.2000
 *                       phone:
 *                         type: string
 *                         description: The user's phone.
 *                         example: +380971234567
 *                       messenger:
 *                         type: string
 *                         description: The user's messenger.
 *                         example: 1234567
 */
userRouter.patch('/info', patchUpdateUserValidation, ctrlWrapper(changeUser));

module.exports = userRouter;
