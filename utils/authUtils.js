const { v4: uuidv4 } = require('uuid');
const Email = require('../service/mailService');
const crypto = require('crypto');
const User = require('../models/userModel');

const createUser = async body => {
  try {
    const verificationCode = uuidv4();
    const { email } = body;

    const emailAlreadyExist = await User.findOne({ email });

    if (emailAlreadyExist) {
      return;
    }

    const newUser = await User.create({
      ...body,
      verificationToken: verificationCode,
    });

    newUser.password = undefined;

    await new Email(
      newUser,
      `${process.env.FRONT_DEV_URL}/verify/${newUser.verificationToken}`
    ).sendVerification();

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

const verifyUser = async verificationToken => {
  try {
    const userWithTokenExist = await User.findOne({ verificationToken });

    return await User.findByIdAndUpdate(
      userWithTokenExist._id,
      { verificationToken: null, verify: true },
      { new: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const checkVerification = async body => {
  try {
    const { email } = body;

    const userWithTokenExist = await User.findOne({ email });

    if (!userWithTokenExist) {
      return;
    }

    await new Email(
      userWithTokenExist,
      `${process.env.FRONT_DEV_URL}/verify/${userWithTokenExist.verificationToken}`
    ).sendVerification();

    return userWithTokenExist;
  } catch (error) {
    console.log(error.message);
  }
};

const logUser = async body => {
  try {
    const { email } = body;

    return await User.findOne({ email });
  } catch (error) {
    console.log(error.message);
  }
};

const saveTokenForUser = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, { new: true });
  } catch (error) {
    console.log(error.message);
  }
};

const getHashedTokenForUser = async otp => {
  try {
    const hashedToken = crypto.createHash('sha256').update(otp).digest('hex');

    return await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
  getHashedTokenForUser,
};
