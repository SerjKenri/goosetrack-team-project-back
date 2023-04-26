const { ImageService } = require('../../service/imageService');
const {
  updateUserFn,
  logoutUserFn,
  updateEmail,
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
  const avatarFile = req.file;
  const newUser = req.body;
  const currentUser = req.user;
  console.log('newUser', newUser);
  console.log('currentUser', currentUser);

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
  if (avatarFile) {
    console.log('-----------Send avatar to cloud--------------');

    currentUser.avatarURL = await ImageService.save(
      avatarFile,
      250,
      250,
      'avatars'
    );
    console.log('currentUser.avatarURL', currentUser.avatarURL);
  }
  // const updatedUser = await currentUser.save({ validateBeforeSave: false });
  // res.status(200).json({ avatarURL: updatedUser.avatarURL });
  /////////////////////////////////////////////////

  const updateUser1111111 = await updateUserFn(currentUser.id, newUser);

  if (!updateUser1111111)
    return res.status(400).json({ message: 'The request cannot be completed' });

  const { id, name, email, avatarURL, birthDay, phone, messenger } =
    updateUser1111111;

  res
    .status(200)
    .json({ id, name, email, avatarURL, birthDay, phone, messenger });
};

module.exports = {
  currentUser,
  logoutUser,
  changeUser,
};
