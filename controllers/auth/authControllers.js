const {
  createUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
  getHashedTokenForUser,
} = require('../../utils/authUtils');
const { signToken } = require('../../service/JWTServices');
const AppError = require('../../utils/appError');
const Column = require('../../models/columnModel');

const User = require('../../models/userModel');
const Email = require('../../service/mailService');

const postUser = async (req, res, next) => {
  const newUserToVerify = await createUser(req.body);

  if (!newUserToVerify) {
    return next(new AppError(409, 'Email in use'));
  }

  const { name, email, _id } = newUserToVerify;

  const todoColumn = { columnName: 'toDo', position: 0, owner: _id };
  const inprogressColumn = {
    columnName: 'inProgress',
    position: 1,
    owner: _id,
  };
  const doneColumn = { columnName: 'done', position: 2, owner: _id };

  await Column.create(todoColumn);
  await Column.create(inprogressColumn);
  await Column.create(doneColumn);

  res.status(201).json({
    user: { name, email },
    message: `Verification email send to user${"'"}s email`,
  });
};

const getUserVerification = async (req, res, next) => {
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

  res.status(200).json({ message: 'Verification email sent' });
};

const postLoggedUser = async (req, res, next) => {
  const { password } = req.body;

  const user = await logUser(req.body);

  if (!user) {
    return next(new AppError(401, 'Email or password is wrong'));
  }

  if (!user.verify) {
    return next(new AppError(401, 'Email is not verified'));
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

const postRestorePass = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: 'No user with such email (temporary for FRONTEND)',
    });
  }

  const otp = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${process.env.FRONT_DEV_URL}/goosetrack-team-project-front/reset-pass/${otp}`;

    await new Email(user, resetUrl).sendPasswordRestore();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    message: 'Password reset instruction sent to email',
  });
};

const patchResetPass = async (req, res, next) => {
  const { otp } = req.params;

  const user = await getHashedTokenForUser(otp);

  if (!user) return next(new AppError(400, 'Token is invalid'));

  user.password = req.body.newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: false });

  user.password = undefined;

  res.status(200).json({ message: 'Password successfully changed' });
};

module.exports = {
  postUser,
  postLoggedUser,
  getUserVerification,
  postVerifiedUser,
  postRestorePass,
  patchResetPass,
};
