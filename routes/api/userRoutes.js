const express = require('express');
const ctrlWrapper = require('../../middlewares/ctrlWrapper');
const {
  currentUser,
  updateMyPassword,
  logoutUser,
  changeUser,
} = require('../../controllers/user/userControler');
const {
  patchUpdateUserValidation,
  userUpdatePassValidation,
} = require('../../middlewares/userValidation');
const protectedRout = require('../../middlewares/authMiddleware');
const uploadCloud = require('../../middlewares/uploadFileMiddleware');
const {
  checkUserPassword,
} = require('../../middlewares/checkUserPasswordMdlw');
const userRouter = express.Router();

// Protected routes
userRouter.use('/', protectedRout);
userRouter.get('/current', ctrlWrapper(currentUser));

///// ========= password reset logic ==/////
userRouter.patch(
  '/update-pass',
  userUpdatePassValidation,
  checkUserPassword,
  ctrlWrapper(updateMyPassword)
);
///// ========= password reset logic ==/////

userRouter.post('/logout', ctrlWrapper(logoutUser));
userRouter.patch(
  '/info',
  uploadCloud.single('avatarURL'),
  patchUpdateUserValidation,
  ctrlWrapper(changeUser)
);

module.exports = userRouter;
