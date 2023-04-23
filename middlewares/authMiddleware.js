const User = require('../models/userModel');
const { decoded } = require('../service/JWTServices');

const protectedRout = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  let decodedToken;
  try {
    decodedToken = decoded(token);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  const currentUser = await User.findById(decodedToken.id);
  if (!currentUser) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  req.user = currentUser;

  next();
};

module.exports = protectedRout;
