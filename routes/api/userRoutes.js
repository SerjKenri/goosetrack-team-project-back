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

userRouter.get('/current', ctrlWrapper(currentUser));
userRouter.post('/logout', ctrlWrapper(logoutUser));
userRouter.patch('/info', patchUpdateUserValidation, ctrlWrapper(changeUser));

module.exports = userRouter;
