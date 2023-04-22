const express = require('express');
const router = express.Router();

const ctrlWrapper = require('../../middlewares/ctrlWrapper');

const {
  postUser,
  postLoggedUser,
  postVerifiedUser,
  getUserVerification,
} = require('../../controllers/auth/authControllers');

router.post('/register', ctrlWrapper(postUser));

router.get('/verify/:verificationToken', ctrlWrapper(getUserVerification));

router.post('/verify', ctrlWrapper(postVerifiedUser));

router.post('/login', ctrlWrapper(postLoggedUser));

module.exports = router;
