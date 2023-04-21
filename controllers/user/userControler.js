const { updateUserFn, logoutUserFn } = require('../../utils/userUtils');

const currentUser = async (req, res, next) => {
  const user = req.user;

  res.status(200).json(user);
};

const logoutUser = async (req, res, next) => {
  const currentUser = req.user;

  await logoutUserFn(currentUser.id);

  res.sendStatus(204);
};

const changeUser = async (req, res, next) => {
  const newUser = req.body;
  const currentUser = req.user;

  const updateUser = await updateUserFn(currentUser.id, newUser);

  //   if (!updateUser)
  //     return res.status(400).json({ message: 'The request cannot be completed' });

  res.status(200).json(updateUser);
};

module.exports = {
  currentUser,
  logoutUser,
  changeUser,
};
