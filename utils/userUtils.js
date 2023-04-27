const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../service/mailService');

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

const updateUserFn = async (userId, newUser) => {
  try {
    const updateUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });
    return updateUser;
  } catch (error) {
    console.log(error);
  }
};

const updateUserwithAvatar = async (userId, newUser, filePath) => {
  try {
    const updatedUserWithAvatar = {
      ...newUser,
      avatarURL: filePath,
    };
    const updateUser = await User.findByIdAndUpdate(
      userId,
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

    const newVerifyEmail = {
      to: newUser.email,
      subject: 'Test email',
      html: `<strong>Please verify your email</strong> <a target="_blank" href="${process.env.DEV_URL}/api/auth/verify/${verificationCode}"> Click the link </a>`,
    };

    await sendEmail(newVerifyEmail);
    await logoutUserFn(userId);

    console.log('updateUserMail is with token', updateUserMail);

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
