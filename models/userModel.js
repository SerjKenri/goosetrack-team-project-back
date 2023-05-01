const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require('crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: {
    type: String,
  },
  birthDay: {
    type: Date,
  },
  phone: {
    type: String,
  },
  messenger: {
    type: String,
  },
  token: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: '',
    required: [true, 'Verify token is required'],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//-----------save with bcrypt-------------//

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//----------bcrypt check password---------//

userSchema.methods.checkPassword = (candidate, hashedPass) =>
  bcrypt.compare(candidate, hashedPass);

//--------create password reset token--------//
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const User = model('user', userSchema);

module.exports = User;
