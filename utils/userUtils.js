const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const Email = require('../service/mailService');

const logoutUserFn = async userId => {
  try {
    const logoutUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { token: 1 } },
      { new: true }
    );

    return logoutUser;
  } catch (error) {
    console.log(error);
  }
};

// --------Update user without avatarFile----------
const updateUserFn = async (currentUser, newUser) => {
  try {
    if (newUser.email !== currentUser.email) {
      const userWithNewEmail = await updateEmail(currentUser.id, newUser);
      return userWithNewEmail;
    }

    const updateUser = await User.findByIdAndUpdate(currentUser.id, newUser, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

// --------Update user wit avatarFile----------
const updateUserwithAvatar = async (currentUser, newUser, filePath) => {
  try {
    const updatedUserWithAvatar = {
      ...newUser,
      avatarURL: filePath,
    };

    if (newUser.email !== currentUser.email) {
      const userWithNewEmail = await updateEmail(
        currentUser.id,
        updatedUserWithAvatar
      );
      return userWithNewEmail;
    }

    const updateUser = await User.findByIdAndUpdate(
      currentUser.id,
      updatedUserWithAvatar,
      {
        new: true,
      }
    );
    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

const updateEmail = async (userId, newUser) => {
  try {
    const verificationCode = uuidv4();

    const updatedUserWithToken = {
      ...newUser,
      verificationToken: verificationCode,
      verify: false,
    };

    const updateUserMail = await User.findByIdAndUpdate(
      userId,
      updatedUserWithToken,
      {
        new: true,
      }
    );

    await new Email(
      updateUserMail,
      `${process.env.FRONT_DEV_URL}/goosetrack-team-project-front/verify/${verificationCode}`
    ).sendVerification();

    logoutUserFn(updateUserMail.id);
    return updateUserMail;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  logoutUserFn,
  updateUserFn,
  updateUserwithAvatar,
  updateEmail,
};
