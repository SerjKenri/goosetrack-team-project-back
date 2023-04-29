const User = require('../models/userModel');

//======== checks the user's current password (before user will be able to set new password we ask him to confirm old password) ============//

const checkUserPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.user;

    const userToChangePass = await User.findById(id).select('password');

    console.log('user1111111111111', userToChangePass);

    const userPasswordIsValid = await userToChangePass.checkPassword(
      currentPassword,
      userToChangePass.password
    );

    if (!userPasswordIsValid) {
      return next(new AppError(401, 'Current password is wrong.'));
    }

    userToChangePass.password = newPassword;

    console.log('user22222222222', userToChangePass);

    await userToChangePass.save();

    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  checkUserPassword,
};
