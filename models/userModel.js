const { mongoose, Schema } = require('mongoose');
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
    type: Number,
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
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);

  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.checkPassword = (candidate, hashedPass) =>
  bcrypt.compare(candidate, hashedPass);

const User = mongoose.model('user', userSchema);

module.exports = User;
