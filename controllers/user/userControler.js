const {
  updateUserFn,
  logoutUserFn,
  updateEmail,
} = require('../../utils/userUtils');

const currentUser = async (req, res, next) => {
  const user = req.user;

  const { id, name, email, avatarURL, birthDay, phone, messenger } = req.user;

  res
    .status(200)
    .json({ user: { id, name, email, avatarURL, birthDay, phone, messenger } });
};

const logoutUser = async (req, res, next) => {
  const currentUser = req.user;

  await logoutUserFn(currentUser.id);

  res.sendStatus(204);
};

const changeUser = async (req, res, next) => {
  const newUser = req.body;
  const currentUser = req.user;

  if (newUser.email !== currentUser.email) {
    const userWithNewEmail = await updateEmail(currentUser.id, newUser);
    if (!userWithNewEmail)
      return res
        .status(400)
        .json({ message: 'The request cannot be completed' });

    const { id, name, email, avatarURL, birthDay, phone, messenger } =
      userWithNewEmail;
    return res
      .status(200)
      .json({ id, name, email, avatarURL, birthDay, phone, messenger });
  }

  if (newUser.avatarURL !== currentUser.avatarURL) {
    console.log('-----------To Do: Send avatar to cloud--------------');
  }

  const updateUser = await updateUserFn(currentUser.id, newUser);

  if (!updateUser)
    return res.status(400).json({ message: 'The request cannot be completed' });

  const { id, name, email, avatarURL, birthDay, phone, messenger } = updateUser;

  res
    .status(200)
    .json({ id, name, email, avatarURL, birthDay, phone, messenger });
};

module.exports = {
  currentUser,
  logoutUser,
  changeUser,
};
