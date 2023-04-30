const {
  createUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
} = require('../../utils/authUtils');
const { signToken } = require('../../service/JWTServices');
const AppError = require('../../utils/appError');
const Column = require('../../models/columnModel');


const postUser = async (req, res, next) => {
  const newUserToVerify = await createUser(req.body);

  if (!newUserToVerify) {
    return next(new AppError(409, 'Email in use'));
  }

  const { name, email, _id } = newUserToVerify;

  const todoColumn = { columnName: "To do", position: 1, owner: _id }
  const inprogressColumn = {columnName: "In progress", position: 2, owner: _id}
  const doneColumn = {columnName: "Done", position: 3, owner: _id}

  await Column.create(todoColumn);
  await Column.create(inprogressColumn);
  await Column.create(doneColumn);

  res.status(201).json({ user: { name, email } });
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

  // res.status(200).json({ message: 'Verification email sent' });

  res.status(200).json({ message: 'Verification is successful' });
};

const postLoggedUser = async (req, res, next) => {
  const { password } = req.body;

  const user = await logUser(req.body);

  if (!user) {
    return next(new AppError(401, 'Email or password is wrong'));
  }

  if (!user.verify) {
    return next(
      new AppError(401, 'Email is not verified (Email or password is wrong)')
    );
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
