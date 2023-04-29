const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const Email = require('../service/mailService');

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
      `${process.env.DEV_URL}/api/auth/verify/${newUser.verificationToken}`
      // `${process.env.DEV_URL}/goosetrack-team-project-front/verify/${newUser.verificationToken}`
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
      `${process.env.DEV_URL}/api/auth/verify/${userWithTokenExist.verificationToken}`
      // `${process.env.DEV_URL}/goosetrack-team-project-front/verify/${userWithTokenExist.verificationToken}`
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

module.exports = {
  createUser,
  verifyUser,
  checkVerification,
  logUser,
  saveTokenForUser,
};
