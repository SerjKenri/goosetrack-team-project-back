const Joi = require('joi');

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

const userRegValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    password: Joi.string().regex(PASSWD_REGEX).required(),
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

const userLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    password: Joi.string().regex(PASSWD_REGEX).required(),
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

const userVerifyValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const validationError = validationResult.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `missing required '${validationError}' field` });
  }

  next();
};

module.exports = {
  userRegValidation,
  userLoginValidation,
  userVerifyValidation,
};
