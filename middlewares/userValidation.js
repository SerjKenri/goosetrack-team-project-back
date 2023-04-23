const Joi = require('joi');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

const patchUpdateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().regex(PASSWD_REGEX).required(),
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

module.exports = {
  patchUpdateUserValidation,
};
