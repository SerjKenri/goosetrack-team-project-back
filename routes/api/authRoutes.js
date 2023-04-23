const express = require('express');
const router = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');

const {
  postUser,
  postLoggedUser,
  postVerifiedUser,
  getUserVerification,
} = require('../../controllers/auth/authControllers');


const {
  userRegValidation,
  userLoginValidation,
  userVerifyValidation,
} = require('../../middlewares/authValidation');

router.post('/register', userRegValidation, ctrlWrapper(postUser));

router.get('/verify/:verificationToken', ctrlWrapper(getUserVerification));

router.post('/verify', userVerifyValidation, ctrlWrapper(postVerifiedUser));

router.post('/login', userLoginValidation, ctrlWrapper(postLoggedUser));

module.exports = router;
