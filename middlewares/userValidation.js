const Joi = require('joi');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

const patchUpdateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    avatarURL: Joi.string().uri(),
    birthDay: Joi.date(),
    phone: Joi.string()
      .min(3)
      .max(20)
      .pattern(/^[0-9-()+ ]+$/),
    messenger: Joi.string(),
  });

  const valodationResult = schema.validate(req.body);

  if (valodationResult.error) {
    const msg = valodationResult.error.details[0].message;
    return res.status(400).json({ message: msg });
    // return res.status(400).json({ message: "Invalid user email or password" });
  }

  next();
};

const userUpdatePassValidation = (req, res, next) => {
  const schema = Joi.object({
    currentPassword: Joi.string().regex(PASSWD_REGEX).required(),
    newPassword: Joi.string().regex(PASSWD_REGEX).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `${validationError} field doesn't match the pattern` });
  }

  next();
};

module.exports = {
  patchUpdateUserValidation,
  userUpdatePassValidation,
};
