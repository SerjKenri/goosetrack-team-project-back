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
const { uploadUserAvatar } = require('../../middlewares/userFormDataUpdate');
const uploadCloud = require('../../middlewares/uploadFileMiddleware');
const userRouter = express.Router();

// //
// const multer = require('multer');
// const upload = multer({ dest: '/' });
// //

// Protected routes

userRouter.use('/', protectedRout);
// ///////////
// userRouter.patch('/info', upload.single('avatarr'), function (req, res, next) {
//   console.log('AVATARRRRRRRRR', req.body, req.file);
// });
// ////////////

userRouter.get('/current', ctrlWrapper(currentUser));
userRouter.post('/logout', ctrlWrapper(logoutUser));
userRouter.patch(
  '/info',
  uploadCloud.single('avatarURL'),
  // uploadUserAvatar,
  patchUpdateUserValidation,
  ctrlWrapper(changeUser)
);

module.exports = userRouter;
