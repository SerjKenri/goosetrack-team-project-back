// const User = require('../models/userModel');

const logoutUserFn = async userId => {
  try {
    // const logoutUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $unset: { token: 1 } },
    //   // { token: undefined },
    //   {
    //     new: true,
    //   }
    // );
    // return logoutUser;
  } catch (error) {
    console.log(error);
  }
};

const updateUserFn = async (userId, newUser) => {
  try {
    // const user = await User.findByIdAndUpdate(userId, newSubscription, {
    //   new: true,
    //   runValidators: true,
    // });
    // return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  logoutUserFn,
  updateUserFn,
};
