const {
  updateUserFn,
  logoutUserFn,
  updateUserwithAvatar,
} = require('../../utils/userUtils');

const currentUser = async (req, res, next) => {
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

  //-------if avatar file-------//
  if (req.file) {
    const userWithAvatar = await updateUserwithAvatar(
      currentUser,
      newUser,
      req.file.path
    );

    if (!userWithAvatar) {
      return res
        .status(400)
        .json({ message: 'The request cannot be completed' });
    }

    const { id, name, email, avatarURL, birthDay, phone, messenger } =
      userWithAvatar;
    return res
      .status(200)
      .json({user: { id, name, email, avatarURL, birthDay, phone, messenger }});
  }

  //-------if no avatar-------//
  const updateUser = await updateUserFn(currentUser, newUser);

  if (!updateUser)
    return res.status(400).json({ message: 'The request cannot be completed' });

  const { id, name, email, avatarURL, birthDay, phone, messenger } = updateUser;

  res
    .status(200)
  .json({user: { id, name, email, avatarURL, birthDay, phone, messenger }});
};

const updateMyPassword = (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = {
  currentUser,
  logoutUser,
  changeUser,
  updateMyPassword,
};
