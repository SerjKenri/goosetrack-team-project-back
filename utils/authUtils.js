const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

const createUser = async body => {
  try {
    const verificationCode = uuidv4();
    const { email } = body;

    const emailAlreadyExist = await User.findOne({ email });

    return await User.create({ ...body, verificationToken: verificationCode });
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
