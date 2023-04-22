const sendEmail = require('../../service/mailService');

const {
  createUser,
  verifyUser,
  checkVerification,
} = require('../../utils/authUtils');

const postUser = async (req, res) => {
  const newUser = await createUser(req.body);

  if (!newUser) {
    return res.status(409).json({ message: 'Email in use' });
  }

  newUser.password = undefined;

  const { name, email, verificationToken } = newUser;

  const verifyEmail = {
    to: email,
    subject: 'Test email',
    html: `<strong>Please verify your email</strong> <a target="_blank" href="${process.env.BASE_URL}api/users/verify/${verificationToken}"> Click the link</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({ user: { name, email } });
};

const getUserVerification = async (req, res) => {
  const { verificationToken } = req.params;

  const userHasVerifyToken = await verifyUser(verificationToken);

  if (!userHasVerifyToken) {
    res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'Verification is successful' });
};

const postVerifiedUser = async (req, res) => {
  const { email } = req.body;

  const verifiedUser = await checkVerification({ email });

  if (!verifiedUser) {
    res.status(404).json({ message: 'User not found' });
  }
  if (verifiedUser.verify) {
    return res
      .status(400)
      .json({ message: 'Verification has already been passed' });
  }

  const verifyEmail = {
    to: email,
    subject: 'Test email',
    // text: "Please verify your email",
    html: `<strong>Please verify your email</strong> <a target="blank" href="${process.env.BASE_URL}api/users/verify/${verifiedUser.verificationToken}">Click the link</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: 'Verification email sent' });
};

const postLoggedUser = async (req, res) => {};

module.exports = {
  postUser,
  postLoggedUser,
  getUserVerification,
  postVerifiedUser,
};
