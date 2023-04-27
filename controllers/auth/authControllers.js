const sendEmail = require('../../service/mailService');

const {
  createUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
} = require('../../utils/authUtils');
const { signToken } = require('../../service/JWTServices');
const AppError = require('../../utils/appError');

const postUser = async (req, res, next) => {
  const newUser = await createUser(req.body);

  if (!newUser) {
    return next(new AppError(409, 'Email in use'));
  }

  newUser.password = undefined;

  const { name, email, verificationToken } = newUser;

  const verifyEmail = {
    to: email,
    subject: 'Test email',
    html: `<strong>Please verify your email</strong> <a target="_blank" href="${process.env.DEV_URL}/api/auth/verify/${verificationToken}"> Click the link </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { name, email } });
};

const getUserVerification = async (req, res) => {
  const { verificationToken } = req.params;

  const userHasVerifyToken = await verifyUser(verificationToken);

  if (!userHasVerifyToken) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({ message: 'Verification is successful' });
};

const postVerifiedUser = async (req, res, next) => {
  const { email } = req.body;

  const verifiedUser = await checkVerification({ email });

  if (!verifiedUser) {
    return next(new AppError(404, 'User not found'));
  }
  if (verifiedUser.verify) {
    return next(new AppError(400, 'Verification has already been passed'));
  }

  const verifyEmail = {
    to: email,
    subject: 'Test email',
    html: `<strong>Please verify your email</strong> <a target="blank" href="${process.env.DEV_URL}/api/auth/verify/${verifiedUser.verificationToken}"> Click the link </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: 'Verification email sent' });
};

const postLoggedUser = async (req, res, next) => {
  const { password } = req.body;

  const user = await logUser(req.body);

  if (!user) {
    return res.status(401).json({ message: 'Email or password is wrong' });
    // return next(new AppError(401, 'Email or password is wrong'));
  }

  if (!user.verify) {
    return next(new AppError(401, 'Email or password is wrong'));
  }

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) {
    return next(new AppError(401, 'Email or password is wrong'));
  }

  user.password = undefined;

  const token = signToken(user.id);

  const { id, name, email, verify } = await saveTokenForUser(user.id, {
    token,
    user,
  });

  res.status(200).json({ user: { id, name, email, verify, token } });
};

module.exports = {
  postUser,
  postLoggedUser,
  getUserVerification,
  postVerifiedUser,
};
